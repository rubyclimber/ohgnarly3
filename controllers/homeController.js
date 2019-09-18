var User = require('../models/user');
var Category = require('../models/category');
var UserContact = require('../models/userContact');
var PendingUser = require('../models/pendingUser');
var ChatUser = require('../models/chatUser');
const authentication = require('../services/authentication');
const responseBuilder = require('../services/response');
const settingsFactory = require('../services/settingsFactory');
const bcrypt = require('bcrypt');

const settings = settingsFactory.getSettings();

module.exports.showHomePage = (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
};

module.exports.login = (req, res) => {
    let username = req.body.userName.toLowerCase();
    User.findOne({userName: username}, (err, user) => {
        if (err) {
            res.status(500);
            res.send(responseBuilder.buildExceptionResponse(err));
            return;
        }

        var encryptedPassword = authentication.encryptString(req.body.password);
        if (user && user.password == encryptedPassword) {
            res.send({userId: user._id, success: true});
        } else {
            res.send({userId: null, success: false});
        }
    });
};

module.exports.chatLogin = (req, res) => {
    let username = req.body.userName.toLowerCase();
    console.log(req.body);
    ChatUser.findOne({userName: username}, (err, user) => {
        if (err) {
            res.status(500);
            res.send(responseBuilder.buildExceptionResponse(err));
            return;
        }

        console.log(user);
        if (!user) {
            res.status(500);
            res.send(responseBuilder.buildExceptionResponse('User not found!'));
        } else {
            bcrypt.compare(req.body.password, user.password, (err, isSame) => {
                if (isSame) {
                    res.send({userId: user._id, success: true, socketUrl: settings.socketUrl});
                } else {
                    res.send({userId: null, success: false, socketUrl: ''});
                }
            });
        }
    });
};

module.exports.getLoggedInUsers = (req, res) => {
    User.find((err, users) => {
        console.log(users);

        res.send('complete');
    });
};

module.exports.createUser = (req, res) => {
    PendingUser.find().exec((err, users) => {
        if (err) {
            return console.error(err);
        }

        if (users && users.length && users.length >= 20) {
            res.send({success: false});
        } else {
            var pendingUser = new PendingUser({
                userName: req.body.username,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                emailAddress: req.body.emailAddress
            });
        
            pendingUser.save();
            res.send({success: true});
        }
    });
};

module.exports.getUsers = (req, res) => {
    ChatUser.find().exec((err, users) => {
        if (err) {
            return console.error(err);
        }

        res.send(users.map(user => {
            return {
                id: user._id,
                userName: user.userName,
                firstName: user.firstName,
                lastName: user.lastName,
                emailAddress: user.emailAddress,
                createdAt: user.createdAt
            }
        }));
    });
};

module.exports.getCategories = (req, res) => {
    Category.find().exec((err, categories) => {
        if (err) {
            return console.error(err);
        }

        res.send(categories.map(category => {
            return {
                id: category._id,
                description: category.categoryDesc,
                createdAt: category.createdAt
            };
        }));
    });
};

module.exports.getContacts = (req, res) => {
    UserContact.find({userId: req.params.userId}).exec((err, contacts) => {
        User.find({_id: {"$in": contacts.map(e => e.contactId)}}).exec((err, users) => {
            if (err) {
                return console.error(err);
            }

            res.send(users);
        });
    });
};

module.exports.getUser = (req, res) => {
    var userId = req.params.userId;
    User.findById(userId).exec((err, user) => {
       if (err) {
           console.error(err);
           res.status(500);
       } 

       res.send(user);
    });
};

module.exports.logObject = (req, res) => {
    console.log(req.body.logObject);

    res.send({success: true});
};

module.exports.checkUsername = (req, res) => {
    var query = {userName: req.body.username};
    User.findOne(query).exec((err, user) => {
        if (err) {
            return console.error(err);
        }

        var response = {
            isAvailable: !user
        }

        res.send(response);
    });
};

module.exports.checkEmailAddress = (req, res) => {
    var query = {emailAddress: req.body.emailAddress};
    User.findOne(query).exec((err, user) => {
        if (err) {
            return console.error(err);
        }

        var response = {
            isAvailable: !user
        }

        res.send(response);
    });
};

module.exports.createManualUser = (req, res) => {
    var user = new User({
        userName: 'rokeefe',
        password: 'WinterIsComing',
        firstName: 'Rob',
        lastName: "O'Keefe",
        emailAddress: 'test@test.com'
    });

    user.save();
    res.send({success: true});
};

module.exports.updateUserPasswords = (req, res) => {
    User.find().exec((err, users) => {
        for (let user of users) {
            console.log(user.userName);
            let query = {_id: user._id};
            let update = {password: authentication.encryptString(user.password)};

            User.findOneAndUpdate(query, update, (err) => {
                if (err) {
                    return console.error(err);
                }

                console.log('done');
            })
        }
    });
};
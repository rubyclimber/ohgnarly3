var User = require('../models/server.user');
var Category = require('../models/server.category');
var UserContact = require('../models/server.userContact');
var PendingUser = require('../models/server.pendingUser');

module.exports.login = function(req, res) {
    let username = req.body.userName.toLowerCase();
    User.findOne({userName: username}, (err, user) => {
        if (err) {
            console.error(err);
            return res.send({success: false, userId: null});
        }
            
        if (user && user.password == req.body.password) {
            res.send({success: true, userId: user._id});
        } else {
            res.send({success: false, userId: null});
        }
    });
};

module.exports.createUser = function(req, res) {
    PendingUser.find().exec((error, users) => {
        console.log(users);
        if (users && users.length && users.length >= 2) {
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

module.exports.getUsers = function(req, res) {
    User.find().exec((err, users) => {
        if (err) {
            return console.error(err);
        }

        res.send(users);
    });
};

module.exports.getCategories = function(req, res) {
    Category.find().exec((err, categories) => {
        if (err) {
            return console.error(err);
        }

        res.send(categories);
    });
};

module.exports.getContacts = function(req, res) {
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
    User.findOne(query).exec((error, user) => {
        if (error) {
            return console.error(error);
        }

        var response = {
            isAvailable: !user
        }

        res.send(response);
    });
};

module.exports.checkEmailAddress = (req, res) => {
    var query = {emailAddress: req.body.emailAddress};
    User.findOne(query).exec((error, user) => {
        if (error) {
            return console.error(error);
        }

        var response = {
            isAvailable: !user
        }

        res.send(response);
    });
};
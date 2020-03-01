module.exports = () => {
    let exports = {};
    const User = require('../models/user');
    const UserContact = require('../models/userContact');
    const PendingUser = require('../models/pendingUser');
    const ChatUser = require('../models/chatUser');


    exports.checkUsername = (req, res) => {
        var query = { userName: req.body.username };
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

    exports.checkEmailAddress = (req, res) => {
        var query = { emailAddress: req.body.emailAddress };
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

    exports.createManualUser = (req, res) => {
        var user = new User({
            userName: 'rokeefe',
            password: 'WinterIsComing',
            firstName: 'Rob',
            lastName: "O'Keefe",
            emailAddress: 'test@test.com'
        });

        user.save();
        res.send({ success: true });
    };

    exports.getContacts = (req, res) => {
        UserContact.find({ userId: req.params.userId }).exec((err, contacts) => {
            User.find({ _id: { "$in": contacts.map(e => e.contactId) } }).exec((err, users) => {
                if (err) {
                    return console.error(err);
                }

                res.send(users);
            });
        });
    };

    exports.getUser = (req, res) => {
        var userId = req.params.userId;
        User.findById(userId).exec((err, user) => {
            if (err) {
                console.error(err);
                res.status(500);
            }

            res.send(user);
        });
    };

    exports.getLoggedInUsers = (req, res) => {
        User.find((err, users) => {
            console.log(users);

            res.send('complete');
        });
    };

    exports.createUser = (req, res) => {
        PendingUser.find().exec((err, users) => {
            if (err) {
                return console.error(err);
            }

            if (users && users.length && users.length >= 20) {
                res.send({ success: false });
            } else {
                var pendingUser = new PendingUser({
                    userName: req.body.username,
                    password: req.body.password,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    emailAddress: req.body.emailAddress
                });

                pendingUser.save();
                res.send({ success: true });
            }
        });
    };

    exports.getUsers = (req, res) => {
        User.find().exec((err, users) => {
            if (err) {
                return console.error(err);
            }

            res.send(users);
        });
    };


    return exports;
}
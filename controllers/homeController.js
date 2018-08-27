var User = require('../models/server.user');
var Category = require('../models/server.category');
var UserContact = require('../models/server.userContact');
var nodemailer = require('nodemailer');

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
    var body = 'Credentials Request:';
    body += `${username}:${req.body.username}\n`;
    body += `${username}:${req.body.password}\n`;
    body += `${username}:${req.body.firstName}\n`;
    body += `${username}:${req.body.lastName}\n`;
    body += `${username}:${req.body.emailAddress}\n`;

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'asmitty92@gmail.com',
            pass: 'Sbsbai#3'
        }
    });

    var mailOptions = {
        from: 'no-reply@ohgnarly.com',
        to: 'asmitty92@gmail.com',
        subject: 'New User Request',
        text: body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.send({success: false});
        } else {
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
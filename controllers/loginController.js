module.exports = () => {
    let exports = {};
    const User = require('../models/user');
    const ChatUser = require('../models/chatUser');
    const authentication = require('../services/authentication');
    const responseBuilder = require('../services/response');
    const bcrypt = require('bcryptjs');
    const settings = require('../services/settings')

    exports.login = (req, res) => {
        let username = req.body.userName.toLowerCase();
        User.findOne({ userName: username }, (err, user) => {
            if (err) {
                res.status(500);
                res.send(responseBuilder.buildExceptionResponse(err));
                return;
            }

            var encryptedPassword = authentication.encryptString(req.body.password);
            if (user && user.password == encryptedPassword) {
                res.send({ userId: user._id, success: true });
            } else {
                res.send({ userId: null, success: false });
            }
        });
    };

    exports.chatLogin = (req, res) => {
        let username = req.body.userName.toLowerCase();
        ChatUser.findOne({ userName: username }, (err, user) => {
            if (err) {
                res.status(500);
                res.send(responseBuilder.buildExceptionResponse(err));
                return;
            }

            if (!user) {
                res.status(500);
                res.send(responseBuilder.buildExceptionResponse('User not found!'));
            }

            bcrypt.compare(req.body.password, user.password, (err, isSame) => {
                if (isSame) {
                    res.send({ userId: user._id, success: true, socketUrl: settings.socketUrl });
                } else {
                    res.send({ userId: null, success: false, socketUrl: '' });
                }
            });
        });
    };

    return exports;
}
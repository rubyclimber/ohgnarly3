const mongoose = require('mongoose');
const User = require('./models/user');
const authentication = require('./services/authentication');
const fs = require('fs');
const bcrypt = require('bcrypt');
const Message = require('./models/message');
const settings = require('./settings');

mongoose.Promise = global.Promise;
mongoose.connect(settings.connectionStrings.ohGnarly, {useMongoClient: true});

function longDivision(divisor, dividend) {
    let result = '';
    //let dividend = 1;
    while (true) {
        if (dividend < divisor) {
            dividend *= 10;
            result += result.length == 0 ? '0.' : '0';
            continue;
        }

        result += Math.floor(dividend / divisor);
        dividend = Math.floor(dividend % divisor) * 10; //set dividend to remainder times 10 for next step
        
        if (dividend == 0 || result.length > 100) {
            break;
        }
    }

    return parseFloat(result);
}

var message = new Message({
    messageBody: 'Hey',
    createdAt: new Date(new Date().setDate(13)),
    userId: '2'
});

Message.find({createdAt: {$gt: new Date(Date.now() - (7 * 24 * 60 * 60 * 1000))}})
    .limit(25)
    .sort("-createdAt")
    .exec((err, messages) => {
    if (err) {
        return console.error(err);
    }

    messages.reverse().forEach(msg => {
        console.log(msg.createdAt)
    });
});
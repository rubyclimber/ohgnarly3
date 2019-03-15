const mongoose = require('mongoose');
const User = require('./models/user');
const authentication = require('./services/authentication');
const fs = require('fs');
const bcrypt = require('bcrypt');
const Message = require('./models/message');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://gnarly_user:Gnarly234@ds149353.mlab.com:49353/gnarly_test', {useMongoClient: true});

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

message.save();

//console.log(longDivision(11, 99));

console.log('done');
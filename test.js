const mongoose = require('mongoose');
const User = require('./models/user');
const authentication = require('./services/authentication');
const fs = require('fs');
const bcrypt = require('bcrypt');

//mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://gnarly_user:Gnarly234@ds149353.mlab.com:49353/gnarly_test', {useMongoClient: true});

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

//console.log(longDivision(11, 99));

// bcrypt.hash('Tbontb#3', 10, (err, encrypted) => {
//     console.log(encrypted);
// });

bcrypt.compare('Tbontb#3', '$2b$10$ipeduuDjrhnV4mBk10w/Kesvup/H89artUYvcIka7mqw2JZGU.WSm', (err, same) => {
    console.log(same);
});
// fs.writeFile('api-key.txt', authentication.encryptString('TinkerTailorSoldierSpartan'), () => {
//     console.log('done');
// });

console.log('done');
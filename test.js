const authentication = require('./services/authentication')
const mongoose = require('mongoose');
const User = require('./models/user');
const Message = require('./models/message');
const Movie = require('./models/movie');

const dotenv = require('dotenv');
dotenv.config();

const settings = require('./services/settings')

console.log('decrypting')
console.log(authentication.decryptString('xG4vyiQNjH0KbcfaXP8ORA=='));
console.log('done')

// /**
//  * Initialize mongodb connection
//  */
// mongoose.Promise = global.Promise;
// console.log(settings.connectionStrings().ohgnarly);
// mongoose.connect(settings.connectionStrings().ohgnarly, { useNewUrlParser: true, useUnifiedTopology: true });
//
// Movie.find().exec((err, movies) => {
//     if (err) {
//         return console.error(err);
//     }
//
//     let count = 0
//     for (let movie of movies) {
//         if (movie.userId == '5d9756c017fe3303be698a73') {
//             //movie.userId = '5d9ce113b3608e16726bc0eb';
//             //movie.save();
//             count++;
//         }
//     }
//     console.log(count);
//     mongoose.connection.close();
// });

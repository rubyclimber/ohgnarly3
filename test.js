const mongoose = require('mongoose');
const User = require('./models/user');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://dbuser:OhGnarly123@ds157187.mlab.com:57187/ohgnarly', {useMongoClient: true});

User.find().exec((err, users) => {
    if (err) {
        return console.error(err);
    }
    //console.log(users);

    mongoose.connection.close();
});

let x = Array(10).fill(0);

console.log(x);
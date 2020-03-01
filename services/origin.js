const settings = require('./settings');

const allowedOrigins = settings.allowedOrigins();

module.exports.origin = (origin, callback) => {
    if (!origin){
        return callback(null, true);
    }

    if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error('Invalid origin'), false);
    }

    return callback(null, true);
};
const settings = require('./settings');

module.exports.origin = (origin, callback) => {
    if (!origin){
        return callback(null, true);
    }

    if (settings.allowedOrigins().indexOf(origin) === -1) {
        return callback(new Error('Invalid origin'), false);
    }

    return callback(null, true);
};
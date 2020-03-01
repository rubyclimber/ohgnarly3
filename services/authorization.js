const settings = require('./settings')

var apiKeys = settings.apiKeys();

module.exports.validateApiCall = (req, res, next) => {
    var sender = req.headers['sender'];
    var apiKey = req.headers['api-key'];
    if (isValidApiKey(sender, apiKey) || isLocal()) {
        next();
    } else {
        res.status(500);
        res.send({message: 'You do not have access to this API!'});
    }
};

module.exports.getApiKey = (application) => {
    return apiKeys[application];
};

function isValidApiKey(sender, apiKey) {
    return sender && apiKey && (apiKeys[sender] == apiKey);
}

function isLocal() {
    var environment = process.env.NODE_ENV || 'development';
    return environment == 'development';
}
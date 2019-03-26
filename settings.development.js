module.exports.connectionStrings = {
    //ohGnarly: 'mongodb://gnarly_user:Gnarly234@ds149353.mlab.com:49353/gnarly_test'
    ohGnarly: 'mongodb://localhost:27017/gnarly_dev'
};

module.exports.allowedOrigins = [
    'http://localhost:3000'
];

module.exports.authExclusionUrls = [
    'chat-login',
    'users',
    'catergories'
];

module.exports.socketUrl = 'http://localhost:1985';
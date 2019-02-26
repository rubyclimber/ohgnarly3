module.exports.connectionStrings = {
    ohGnarly: 'mongodb://gnarly_user:Gnarly234@ds149353.mlab.com:49353/gnarly_test'
};

module.exports.allowedOrigins = [
    'http://ohgnarly-staging.herokuapp.com',
    'https://ohgnarly-staging.herokuapp.com'
];

module.exports.authExclusionUrls = [
    'chat-login',
    'users',
    'catergories'
];

module.exports.socketUrl = 'https://ohgnarly3-staging.herokuapp.com';
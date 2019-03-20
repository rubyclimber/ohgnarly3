module.exports.connectionStrings = {
    ohGnarly: 'mongodb://gnarly_user:Gnarly123@ds123500.mlab.com:23500/gnarly_staging'
};

module.exports.allowedOrigins = [
    'http://ohgnarly-staging.herokuapp.com',
    'https://ohgnarly-staging.herokuapp.com',
    'http://localhost:3000'
];

module.exports.authExclusionUrls = [
    'chat-login',
    'users',
    'catergories'
];

module.exports.socketUrl = 'https://ohgnarly3-staging.herokuapp.com';
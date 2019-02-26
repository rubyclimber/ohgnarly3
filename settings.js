module.exports.connectionStrings = {
    ohGnarly: 'mongodb://dbuser:OhGnarly123@ds157187.mlab.com:57187/ohgnarly'
};

module.exports.allowedOrigins = [
    'http://ohgnarly.herokuapp.com', 
    'https://ohgnarly.herokuapp.com'
];

module.exports.authExclusionUrls = [
    'chat-login',
    'users',
    'catergories'
];

module.exports.socketUrl = 'https://ohgnarly3.herokuapp.com';
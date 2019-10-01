module.exports.connectionStrings = {
    ohGnarly: 'mongodb://dbuser:OhGnarly123@cluster0-shard-00-00-hds1u.mongodb.net:27017,cluster0-shard-00-01-hds1u.mongodb.net:27017,cluster0-shard-00-02-hds1u.mongodb.net:27017/ohgnarly?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'
    // ohGnarly: 'mongodb://dbuser:OhGnarly123@ds157187.mlab.com:57187/ohgnarly'
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
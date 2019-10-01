module.exports.connectionStrings = {
    ohGnarly: 'mongodb://dbuser:OhGnarly123@cluster0-shard-00-00-hds1u.mongodb.net:27017,cluster0-shard-00-01-hds1u.mongodb.net:27017,cluster0-shard-00-02-hds1u.mongodb.net:27017/gnarly_test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'
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
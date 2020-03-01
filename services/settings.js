module.exports.connectionStrings = () => {
    return {
        ohgnarly: process.env.CONNECTION_STRING
    };
};

module.exports.allowedOrigins = () => {
    return process.env.ALLOWED_ORIGINS.split('|');
};

module.exports.authExclusionUrls = () => {
    return process.env.AUTH_EXCLUSION_URLS.split('|');
};

module.exports.socketUrl = process.env.SOCKET_URL;

module.exports.cryptoPassword = () => {
    return process.env.CRYPTO_PASSWORD;
};

module.exports.cryptoAlgorithm = () => {
    return process.env.CRYPTO_ALGORITHM;
};

module.exports.apiKeys = () => {
    return {
            ohGnarlyMovies: process.env.OH_GNARLY_MOVIES_KEY,
            ohGnarlyChat: process.env.OH_GNARLY_CHAT_KEY,
            messageParser: process.env.MESSAGE_PARSER_KEY
    };
}
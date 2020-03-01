module.exports.connectionStrings = () => {
    return {
        ohgnarly: process.env.CONNECTION_STRING
    }
}

module.exports.allowedOrigins = () => {
    return process.env.ALLOWED_ORIGINS.split('|')
}

module.exports.authExclusionUrls = () => {
    return process.env.AUTH_EXCLUSION_URLS.split('|')
};

module.exports.socketUrl = process.env.SOCKET_URL
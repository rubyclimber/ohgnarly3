var apiKeys = {
    'ohGnarlyMovies': 'QlULR6lMQ2gZqZdVplXcn6wyIrNTkGcJPHWsU+gFSFQ='
};

module.exports.validateApiCall = (req, res, next) => {
    var sender = req.headers['sender'];
    var apiKey = req.headers['api-key'];
    if (sender && apiKey && (apiKeys[sender] == apiKey)) {
        next();
    } else {
        res.status(500);
        res.send({message: 'You do not have access to this API!'});
    }
}
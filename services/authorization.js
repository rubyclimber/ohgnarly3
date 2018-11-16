var apiKeys = {
    'ohGnarlyMovies': 'QlULR6lMQ2gZqZdVplXcn6wyIrNTkGcJPHWsU+gFSFQ=',
    'ohGnarlyChat': 'M1lxUG7MdBbvsaPEjono+w=='
};

module.exports.validateApiCall = (req, res, next) => {
    var sender = req.headers['sender'];
    var apiKey = req.headers['api-key'];
    console.log('api-keys: ', apiKeys);
    console.log('sender: ', sender);
    console.log('api-key: ', apiKey);
    if (sender && apiKey && (apiKeys[sender] == apiKey)) {
        next();
    } else {
        res.status(500);
        res.send({message: 'You do not have access to this API!'});
    }
}
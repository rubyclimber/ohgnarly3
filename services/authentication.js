const crypto = require('crypto');
const settings = require('./settings');
const password = settings.cryptoPassword();
const algorithm = settings.cryptoAlgorithm();

module.exports.encryptString = function(input) {
    var cipher = crypto.createCipher(algorithm, password);
    var encrypted = cipher.update(input, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
};

module.exports.decryptString = function(input) {
    var decipher = crypto.createDecipher(algorithm, password);
    var decrypted = '';

    decipher.on('readable', function() {
        var data = decipher.read();

        if (data) {
            decrypted += data.toString();
        }
    });

    decipher.on('end', function() {
    });

    decipher.write(input, 'base64');
    decipher.end();
    return decrypted;
};

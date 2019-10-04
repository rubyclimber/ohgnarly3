module.exports.getSettings = () => {
    let environment = process.env.NODE_ENV || 'production';
    let settings;
    if (environment === 'production') {
        settings = require('../settings');
    } else {
        settings = require(`../settings.${environment}`);
    }
    return settings;
};
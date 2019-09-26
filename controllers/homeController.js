module.exports = () => {
    let exports = {};
    const Category = require('../models/category');

    exports.showHomePage = (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    };

    exports.ping = (req, res) => {
        res.send(req.body);
    };

    exports.getCategories = (req, res) => {
        Category.find().exec((err, categories) => {
            if (err) {
                return console.error(err);
            }

            res.send(categories);
        });
    };

    exports.logObject = (req, res) => {
        console.log(req.body.logObject);

        res.send({ success: true });
    };

    return exports;
}
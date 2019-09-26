function HomeController(category) {
    this.showHomePage = (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    };

    this.ping = (req, res) => {
        res.send(req.body);
    };

    this.getCategories = (req, res) => {
        category.find().exec((err, categories) => {
            if (err) {
                return console.error(err);
            }

            res.send(categories);
        });
    };

    this.logObject = (req, res) => {
        console.log(req.body.logObject);

        res.send({ success: true });
    };
}

module.exports = HomeController;
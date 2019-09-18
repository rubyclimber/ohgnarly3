const Person = require('../models/person')

module.exports.createPerson = (req, res) => {
    var people = req.body.records;
    for (var item in people) {
        var person = new Person({
            name: item.name,
            age: item.age,
            dob: item.dob
        });
        person.save();
    }
    res.send({success: true});
};
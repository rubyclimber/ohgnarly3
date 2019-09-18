const Person = require('../models/person')

module.exports.createPerson = (req, res) => {
    var people = req.body.records;
    var ids = [];
    for (var item of people) {
        var person = new Person({
            name: item.name,
            age: item.age,
            dob: item.dob
        });
        person.save();
        ids.push(person._id)
    }
    res.send({success: true, ids: ids});
};
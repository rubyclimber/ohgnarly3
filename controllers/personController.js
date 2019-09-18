const Person = require('../models/person')

module.exports.createPerson = (req, res) => {
    console.log(req.body);
    if (!req.body.records) {
        res.send({success: false});
        return;
    }

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
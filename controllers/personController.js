const Person = require('../models/person')

module.exports.createPerson = (req, res) => {
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

module.exports.deletePerson = (req, res) => {
    var personId = req.params.personId;
    Person.findById(personId).exec((err, person) => {
        if (err) {
           console.error(err);
           res.status(500);
        } 

        person.remove();
        res.send(person);
    });
};

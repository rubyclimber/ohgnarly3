const Person = require('../models/person')

module.exports.createPerson = (req, res) => {
    var person = new Person({
        name: req.body.name,
        age: req.body.age,
        dob: req.body.dob
    });
    person.save()
    res.send(person)
};
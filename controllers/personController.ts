import {Request, Response} from 'express';
import {PersonRepository} from '../repositories/personRepository';

export class PersonController {
    personRepository: PersonRepository;

    constructor(personRepository?: PersonRepository) {
        this.personRepository = personRepository || new PersonRepository();
    }

    createPerson = async (req: Request, res: Response) => {
        if (!req.body.records) {
            res.send({success: false});
            return;
        }

        const people = req.body.records;
        const ids = [];
        for (const item of people) {
            const document = await this.personRepository.add({name: item.name, age: item.age, dob: item.dob});
            ids.push(document._id)
        }
        res.send({success: true, ids: ids});
    };

    deletePerson = async (req: Request, res: Response) => {
        const personId = req.params.personId;
        return this.personRepository.delete(personId).then(person => {
            if (person) {
                res.send(person);
            }

            return res.send(null);
        });
    };
}

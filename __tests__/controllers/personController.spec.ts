import {PersonController} from '../../controllers/personController';
import {Person, PersonDocument} from '../../models/person';
import {Request, Response} from 'express';
import {PersonRepository} from '../../repositories/personRepository';

describe('PersonController', () => {
    let personController: PersonController;
    let personRepository: PersonRepository;
    let res: Response;

    beforeEach(() => {
        res = {send: jest.fn()} as any as Response;
    });

    describe('createPerson', () => {
        beforeEach(() => {
            personRepository = new PersonRepository();
            personRepository.add = jest.fn();
            personController = new PersonController(personRepository);
        });

        it('should add people', async () => {
            const people = [
                {name: 'Aaron', age: 39, dob: new Date(1981, 10, 10)},
                {name: 'Heather', age: 40, dob: new Date(1980, 12, 12)}
            ];
            const req = {body: {records: people}} as Request;

            personRepository.add = jest
                .fn()
                .mockResolvedValueOnce({_id: '123'} as PersonDocument)
                .mockResolvedValueOnce({_id: '456'} as PersonDocument);

            await personController.createPerson(req, res);

            expect(res.send).toBeCalledWith({success: true, ids: ['123', '456']});
            expect(personRepository.add).toBeCalledTimes(2);
        });

        it('should return failure if no people to add', () => {
            const req = {body: {records: undefined}} as Request;
            const res = {send: jest.fn()} as any as Response;

            personController.createPerson(req, res);

            expect(res.send).toBeCalledWith({success: false});
        });
    });

    describe('deletePerson', () => {
        let req: Request;

        beforeEach(() => {
            personRepository = new PersonRepository();
            personRepository.delete = jest.fn();
            personController = new PersonController(personRepository);
            req = {params: {personId: '123'}} as any as Request;
        });

        it('it should delete a person', async () => {
            const person = {} as Person;

            personRepository.delete = jest.fn().mockResolvedValue(person);

            await personController.deletePerson(req, res);

            expect(res.send).toBeCalledWith(person);
        });

        it('it should return null if no person found', async () => {
            personRepository.delete = jest.fn().mockResolvedValue(undefined);

            await personController.deletePerson(req, res);

            expect(res.send).toBeCalledWith(null);
        });
    });
});
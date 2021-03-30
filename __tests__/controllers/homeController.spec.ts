import {HomeController} from '../../controllers/homeController';
import {Request, Response} from 'express';
import {CategoryRepository} from '../../repositories/categoryRepository';

describe('HomeController', () => {
    let homeController: HomeController;

    describe('showHomePage', () => {
        beforeEach(() => {
            homeController = new HomeController();
        });

        it('should return the index.html view', async () => {
            const req = {} as Request;
            const res = {sendFile: jest.fn()} as any as Response;

            await homeController.showHomePage(req, res);

            expect(res.sendFile).toHaveBeenCalledWith(expect.anything());
        });
    });

    describe('ping', () => {
        beforeEach(() => {
            homeController = new HomeController();
        });

        it('should return the passed in body', async () => {
            const req = {body: 'my-body'} as Request;
            const res = {send: jest.fn()} as any as Response;

            await homeController.ping(req, res);

            expect(res.send).toHaveBeenCalledWith(req.body);
        });
    });

    describe('getCategories', () => {
        let categoryRepository: CategoryRepository;

        beforeEach(() => {
            categoryRepository = new CategoryRepository();
            homeController = new HomeController(categoryRepository);
        });

        it('should return all catergories', async () => {
            const req = {} as Request;
            const res = {send: jest.fn()} as any as Response;
            const categories = [{}, {}];

            categoryRepository.getAll = jest.fn().mockResolvedValue(categories);

            await homeController.getCategories(req, res);

            expect(res.send).toHaveBeenCalledWith(categories);
        });

        it('should return an error if data error occurs', async () => {
            const req = {} as Request;
            const res = {send: jest.fn()} as any as Response;
            const error = new Error('this is my expected error');

            categoryRepository.getAll = jest.fn().mockRejectedValue(error);

            await homeController.getCategories(req, res);

            expect(res.send).toHaveBeenCalledWith(error);
        });
    });
});
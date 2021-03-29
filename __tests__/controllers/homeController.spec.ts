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

            await homeController.ping(req, res, jest.fn());

            expect(res.send).toHaveBeenCalledWith(req.body);
        });
    });

    describe('getCategories', () => {
        let categoryRepository: CategoryRepository;
        let mockGetAll: jest.Mock;
        beforeEach(() => {
            categoryRepository = new CategoryRepository();
            mockGetAll = categoryRepository.getAll = jest.fn();
            homeController = new HomeController(categoryRepository);
        });

        it('should return all catergories', async () => {
            const req = {} as Request;
            const res = {send: jest.fn()} as any as Response;
            const categories = [{}, {}];

            mockGetAll.mockReturnValueOnce(Promise.resolve(categories));

            await homeController.getCategories(req, res, jest.fn());

            expect(res.send).toHaveBeenCalledWith(categories);
        });

        it('should return an error if data error occurs', async () => {
            const req = {} as Request;
            const res = {send: jest.fn()} as any as Response;

            mockGetAll.mockReturnValueOnce(Promise.reject(new Error('this is my expected error')));

            try {
                await homeController.getCategories(req, res, jest.fn());
            } catch (err) {
                expect(res.send).toHaveBeenCalledWith(err);
            }
        });
    });
});
import {LoginController} from '../../controllers/loginController';
import {Request, Response} from 'express';
import {UserRepository} from '../../repositories/userRepository';
import {UserDocument} from '../../models/user';
import {ResponseBuilder} from '../../services/response';
import bcrypt from 'bcryptjs';

jest.mock('bcryptjs');

describe('LoginController', () => {
    let req: Request;
    let res: Response;
    let loginController: LoginController;
    let userRepository: UserRepository;
    let mockGet: jest.Mock<Promise<UserDocument>>;

    beforeEach(() => {
        process.env.CRYPTO_ALGORITHM = 'aes192';
        process.env.CRYPTO_PASSWORD = "ThisIsATestPassword";
        res = {send: jest.fn()} as any as Response;
        userRepository = new UserRepository();
        loginController = new LoginController(userRepository);
    });

    describe('login', () => {
        beforeEach(() => {
            mockGet = userRepository.getUserByUserName = jest.fn()
        });

        it('should return success with valid login info', async () => {
            req = {body: {userName: 'user-name', password: 'my-password'}} as any as Request;
            const user = {password: 'NUAmkOMxqfcDXSFzcG0xRA==', _id: '123'} as UserDocument;

            mockGet.mockReturnValueOnce(Promise.resolve(user));

            await loginController.login(req, res, jest.fn());

            expect(res.send).toHaveBeenCalledWith({userId: '123', success: true})
        });

        it('should return failure if password is invalid', async () => {
            req = {body: {userName: 'user-name', password: 'invalid-password'}} as any as Request;
            const user = {password: 'NUAmkOMxqfcDXSFzcG0xRA==', _id: '123'} as UserDocument;

            mockGet.mockReturnValueOnce(Promise.resolve(user));

            await loginController.login(req, res, jest.fn());

            expect(res.send).toHaveBeenCalledWith({userId: null, success: false});
        });

        it('should return throw error if username is invalid', async () => {
            req = {body: {userName: 'user-name', password: 'invalid-password'}} as any as Request;
            res.status = jest.fn();
            const error = new Error('user is not found');
            const expectedResponse = ResponseBuilder.buildExceptionResponse(error)

            mockGet.mockReturnValueOnce(Promise.reject(error));

            try {
                await loginController.login(req, res, jest.fn());
            } catch (err) {
                expect(res.status).toHaveBeenCalledWith(500);
                expect(res.send).toHaveBeenCalledWith(expectedResponse);
            }
        });
    });

    describe('chatLogin', () => {
        beforeEach(() => {
            mockGet = userRepository.getChatUser = jest.fn()
        });

        it('should return success with valid chat login info', async () => {
            req = {body: {userName: 'user-name', password: 'my-password'}} as any as Request;
            const user = {password: 'NUAmkOMxqfcDXSFzcG0xRA==', _id: '123'} as UserDocument;

            mockGet.mockReturnValueOnce(Promise.resolve(user));
            bcrypt.compare = jest.fn().mockImplementation((a, b, c) => {
                c(null, true);
            });

            await loginController.chatLogin(req, res, jest.fn());

            expect(res.send).toHaveBeenCalledWith({userId: '123', success: true})
        });

        it('should return failure if chat password is invalid', async () => {
            req = {body: {userName: 'user-name', password: 'invalid-password'}} as any as Request;
            const user = {password: 'NUAmkOMxqfcDXSFzcG0xRA==', _id: '123'} as UserDocument;

            mockGet.mockReturnValueOnce(Promise.resolve(user));
            bcrypt.compare = jest.fn().mockImplementation((a, b, c) => {
                c(null, false);
            });


            await loginController.chatLogin(req, res, jest.fn());

            expect(res.send).toHaveBeenCalledWith({userId: null, success: false, socketUrl: ''});
        });

        it('should return throw error if chat username is invalid', async () => {
            req = {body: {userName: 'user-name', password: 'invalid-password'}} as any as Request;
            res.status = jest.fn();
            const error = new Error('user is not found');
            const expectedResponse = ResponseBuilder.buildExceptionResponse(error)

            mockGet.mockReturnValueOnce(Promise.reject(error));

            try {
                await loginController.chatLogin(req, res, jest.fn());
            } catch (err) {
                expect(res.status).toHaveBeenCalledWith(500);
                expect(res.send).toHaveBeenCalledWith(expectedResponse);
            }
        });
    });
});
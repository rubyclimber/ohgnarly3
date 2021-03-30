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
    let user: UserDocument;

    beforeEach(() => {
        process.env.CRYPTO_ALGORITHM = 'aes192';
        process.env.CRYPTO_PASSWORD = "ThisIsATestPassword";
        req = {body: {userName: 'user-name', password: 'invalid-password'}} as any as Request;
        res = {send: jest.fn()} as any as Response;
        user = {password: '$This*Is&The&Encrypted%Password', _id: '123'} as UserDocument;
        userRepository = new UserRepository();
        loginController = new LoginController(userRepository);
    });

    describe('login', () => {
        it('should return success with valid login info', async () => {
            userRepository.getUserByUserName = jest.fn().mockResolvedValue(user);
            bcrypt.compare = jest.fn().mockResolvedValue(true);

            await loginController.login(req, res);

            expect(res.send).toHaveBeenCalledWith({userId: '123', success: true})
        });

        it('should return failure if password is invalid', async () => {
            userRepository.getUserByUserName = jest.fn().mockResolvedValue(user);
            bcrypt.compare = jest.fn().mockResolvedValue(false);

            await loginController.login(req, res);

            expect(res.send).toHaveBeenCalledWith({userId: null, success: false});
        });

        it('should return throw error if username is invalid', async () => {
            res.status = jest.fn();
            const error = new Error('user is not found');
            const expectedResponse = ResponseBuilder.buildExceptionResponse(error)

            userRepository.getUserByUserName = jest.fn().mockRejectedValue(error);

            await loginController.login(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith(expectedResponse);
        });
    });

    describe('chatLogin', () => {
        it('should return success with valid chat login info', async () => {
            userRepository.getChatUser = jest.fn().mockResolvedValue(user);
            bcrypt.compare = jest.fn().mockResolvedValue(true);

            await loginController.chatLogin(req, res);

            expect(res.send).toHaveBeenCalledWith({userId: '123', success: true})
        });

        it('should return failure if chat password is invalid', async () => {
            userRepository.getChatUser = jest.fn().mockResolvedValue(user);
            bcrypt.compare = jest.fn().mockResolvedValue(false);

            await loginController.chatLogin(req, res);

            expect(res.send).toHaveBeenCalledWith({userId: null, success: false, socketUrl: ''});
        });

        it('should return throw error if chat username is invalid', async () => {
            res.status = jest.fn();
            const error = new Error('user is not found');
            const expectedResponse = ResponseBuilder.buildExceptionResponse(error)

            userRepository.getChatUser = jest.fn().mockRejectedValue(error);

            await loginController.chatLogin(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith(expectedResponse);
        });
    });
});
import {UserController} from '../../controllers/userController';
import {UserRepository} from '../../repositories/userRepository';
import {UserDocument} from '../../models/user';
import {Request, Response} from 'express';

describe('UserController', () => {
    let userController: UserController;
    let userRepository: UserRepository;
    let mockRepoFn: jest.Mock<Promise<UserDocument>>;
    let req: Request;
    let res: Response;

    beforeEach(() => {
        userRepository = new UserRepository();
        userController = new UserController(userRepository);
        res = {send: jest.fn()} as any as Response;
    });

    describe('checkUserName', () => {
        beforeEach(() => {
            mockRepoFn = userRepository.getUserByUserName = jest.fn();
            req = {body: {username: 'my-user-name'}} as Request;
        });

        it('should return true if user name is available', async () => {
            mockRepoFn.mockResolvedValue(undefined);

            await userController.checkUsername(req, res);

            expect(res.send).toHaveBeenCalledWith({isAvailable: true});
        });

        it('should return false if user name not is available', async () => {
            mockRepoFn.mockResolvedValue({} as UserDocument);

            await userController.checkUsername(req, res);

            expect(res.send).toHaveBeenCalledWith({isAvailable: false});
        });

        it('should raise error if lookup fails', async () => {
            const error = new Error('data lookup failed');
            mockRepoFn.mockRejectedValue(error);

            await userController.checkUsername(req, res);

            expect(res.send).toHaveBeenCalledWith(error);
        });
    });

    describe('checkEmailAddress', () => {
        beforeEach(() => {
            mockRepoFn = userRepository.getUserByEmailAddress = jest.fn();
            req = {body: {emailAddress: 'my-email-address'}} as Request;
        });

        it('should return true if email is available', async () => {
            mockRepoFn.mockResolvedValue(undefined);

            await userController.checkEmailAddress(req, res);

            expect(res.send).toHaveBeenCalledWith({isAvailable: true});
        });

        it('should return false if email is not available', async () => {
            mockRepoFn.mockResolvedValue({} as UserDocument);

            await userController.checkEmailAddress(req, res);

            expect(res.send).toHaveBeenCalledWith({isAvailable: false});
        });

        it('should raise error if lookup fails', async () => {
            const error = new Error('lookup failed');
            mockRepoFn.mockRejectedValue(error);

            await userController.checkEmailAddress(req, res);

            expect(res.send).toHaveBeenCalledWith(error);
        });
    });

    describe('createUser', () => {
        beforeEach(() => {
            mockRepoFn = userRepository.addPendingUser = jest.fn();
        });

        it('should add new user', async () => {
            req = {
                body: {
                    userName: 'user-name',
                    password: 'password',
                    firstName: 'first-name',
                    lastName: 'last-name',
                    emailAddress: 'email-address'
                }
            } as Request;

            mockRepoFn.mockResolvedValue({} as UserDocument);
            userRepository.getAllPendingUsers = jest.fn().mockResolvedValue([]);

            await userController.createUser(req, res);

            expect(mockRepoFn).toHaveBeenCalledWith(req.body);
            expect(res.send).toHaveBeenCalledWith({success: true});
        });

        it('should raise error if lookup fails', async () => {
            const expectedErr = new Error('lookup failed');
            userRepository.getAllPendingUsers = jest.fn().mockRejectedValue(expectedErr);

            await userController.createUser(req, res);

            expect(res.send).toHaveBeenCalledWith(expectedErr);
        });

        it('should raise error if add fails', async () => {
            const expectedErr = new Error('lookup failed');
            userRepository.addPendingUser = jest.fn().mockRejectedValue(expectedErr);
            userRepository.getAllPendingUsers = jest.fn().mockResolvedValue([]);

            await userController.createUser(req, res);

            expect(res.send).toHaveBeenCalledWith(expectedErr);
        });

        it('should fail if pending queue is greater than 20', async () => {
            userRepository.getAllPendingUsers = jest.fn().mockResolvedValue(new Array<UserDocument>(20));

            await userController.createUser(req, res);

            expect(res.send).toHaveBeenCalledWith({success: false});
        });
    });

    describe('getUser', () => {
        beforeEach(() => {
            req = {params: {userName: 'my-user-name'}} as any as Request;
        });

        it('should return user if id is valid', async () => {
            const user = {} as UserDocument;
            userRepository.getUserByUserName = jest.fn().mockResolvedValue(user);

            await userController.getUser(req, res);

            expect(res.send).toHaveBeenCalledWith(user);
        });

        it('should raise error if user is not present', async () => {
            userRepository.getUserByUserName = jest.fn().mockResolvedValue(undefined);

            await userController.getUser(req, res);

            expect(res.send).toHaveBeenCalledWith(new Error('User not found in database'));
        });

        it('should raise error if database error occurs', async () => {
            const error = new Error('lookup fails');
            userRepository.getUserByUserName = jest.fn().mockRejectedValue(error);

            await userController.getUser(req, res);

            expect(res.send).toHaveBeenCalledWith(error);
        });
    });

    describe('getUsers', () => {
        it('should return all users', async () => {
            const user = {} as UserDocument;
            userRepository.getAllUsers = jest.fn().mockResolvedValue([user, user]);

            await userController.getUsers(req, res);

            expect(res.send).toHaveBeenCalledWith([user, user]);
        });

        it('should raise error if lookup fails', async () => {
            const error = new Error('Lookup failed');
            userRepository.getAllUsers = jest.fn().mockRejectedValue(error);

            await userController.getUsers(req, res);

            expect(res.send).toHaveBeenCalledWith(error);
        });
    });
});
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

            await userController.checkUsername(req, res, jest.fn());

            expect(res.send).toHaveBeenCalledWith({isAvailable: true});
        });

        it('should return false if user name not is available', async () => {
            mockRepoFn.mockResolvedValue({} as UserDocument);

            await userController.checkUsername(req, res, jest.fn());

            expect(res.send).toHaveBeenCalledWith({isAvailable: false});
        });

        it('should raise error if lookup fails', async () => {
            const error = new Error('data lookup failed');
            mockRepoFn.mockRejectedValue(error);

            await userController.checkUsername(req, res, jest.fn());

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

            await userController.checkEmailAddress(req, res, jest.fn());

            expect(res.send).toHaveBeenCalledWith({isAvailable: true});
        });

        it('should return false if email is not available', async () => {
            mockRepoFn.mockResolvedValue({} as UserDocument);

            await userController.checkEmailAddress(req, res, jest.fn());

            expect(res.send).toHaveBeenCalledWith({isAvailable: false});
        });

        it('should raise error if lookup fails', async () => {
            const error = new Error('lookup failed');
            mockRepoFn.mockRejectedValue(error);

            await userController.checkEmailAddress(req, res, jest.fn());

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

            mockRepoFn.mockReturnValueOnce(Promise.resolve({} as UserDocument));
            userRepository.getAllPendingUsers = jest.fn().mockReturnValueOnce(Promise.resolve([]));

            await userController.createUser(req, res, jest.fn());

            expect(mockRepoFn).toHaveBeenCalledWith(req.body);
            expect(res.send).toHaveBeenCalledWith({success: true});
        });

        it('should raise error if lookup fails', async () => {
            const expectedErr = new Error('lookup failed');
            userRepository.getAllPendingUsers = jest.fn().mockReturnValueOnce(Promise.reject(expectedErr));

            try {
                await userController.createUser(req, res, jest.fn());
            } catch (err) {
                expect(err).toEqual(expectedErr);
                expect(res.send).toHaveBeenCalledWith(err);
            }
        });

        it('should raise error if add fails', async () => {
            const expectedErr = new Error('lookup failed');
            userRepository.addPendingUser = jest.fn().mockReturnValueOnce(Promise.reject(expectedErr));
            userRepository.getAllPendingUsers = jest.fn().mockReturnValueOnce(Promise.resolve([]));

            try {
                await userController.createUser(req, res, jest.fn());
            } catch (err) {
                expect(err).toEqual(expectedErr);
                expect(res.send).toHaveBeenCalledWith(err);
            }
        });

        it('should fail if pending queue is greater than 20', async () => {
            userRepository.getAllPendingUsers = jest.fn().mockReturnValueOnce(Promise.resolve(new Array<UserDocument>(20)));

            await userController.createUser(req, res, jest.fn());

            expect(res.send).toHaveBeenCalledWith({success: false});
        });
    });

    describe('getUser', () => {
        beforeEach(() => {
            req = {params: {userName: 'my-user-name'}} as any as Request;
        });

        it('should return user if id is valid', async () => {
            const user = {} as UserDocument;
            userRepository.getUserByUserName = jest.fn().mockReturnValueOnce(Promise.resolve(user));

            await userController.getUser(req, res, jest.fn());

            expect(res.send).toHaveBeenCalledWith(user);
        });

        it('should raise error if user is not present', async () => {
            userRepository.getUserByUserName = jest.fn().mockReturnValueOnce(Promise.resolve(undefined));

            await userController.getUser(req, res, jest.fn());

            expect(res.send).toHaveBeenCalledWith(new Error('User not found in database'));
        });

        it('should raise error if database error occurs', async () => {
            userRepository.getUserByUserName = jest.fn().mockReturnValueOnce(Promise.reject(new Error('lookup fails')));

            try {
                await userController.getUser(req, res, jest.fn());
            } catch (err) {
                expect(res.send).toHaveBeenCalledWith(err);
            }
        })
    });

    describe('getUsers', () => {
        it('should return all users', async () => {
            const user = {} as UserDocument;
            userRepository.getAllUsers = jest.fn().mockReturnValueOnce(Promise.resolve([user, user]));

            await userController.getUsers(req, res, jest.fn());

            expect(res.send).toHaveBeenCalledWith([user, user]);
        });

        it('should raise error if lookup fails', async () => {
            userRepository.getAllUsers = jest.fn().mockReturnValueOnce(Promise.reject(new Error('Lookup failed')));

            try {
                await userController.getUsers(req, res, jest.fn());
            } catch (err) {
                expect(res.send).toHaveBeenCalledWith(err);
            }
        })
    });
});
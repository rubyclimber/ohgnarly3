import {RequestHandler} from 'express';
import {UserDocument} from '../models/user';
import {UserRepository} from '../repositories/userRepository';

export class UserController {
    private readonly userRepository: UserRepository;

    constructor(userRepository?: UserRepository) {
        this.userRepository = userRepository || new UserRepository();
    }

    checkUsername: RequestHandler = (req, res) => {
        const userName = req.body.username;
        this.userRepository.getUserByUserName(userName).then((user: UserDocument) => {
            const response = {
                isAvailable: !user
            };

            res.send(response);
        }).catch(err => {
            return res.send(err);
        });
    };

    checkEmailAddress: RequestHandler = (req, res) => {
        const emailAddress = req.body.emailAddress;
        return this.userRepository.getUserByEmailAddress(emailAddress).then((user: UserDocument) => {
            const response = {
                isAvailable: !user
            };

            return res.send(response);
        }).catch(err => {
            return res.send(err);
        });
    };

    getUser: RequestHandler = (req, res) => {
        const userName = req.params.userName;
        return this.userRepository.getUserByUserName(userName).then((user: UserDocument) => {
            if (!user) {
                res.send(Error('User not found in database'));
            }

            return res.send(user);
        }).catch(err => {
            return res.send(err);
        });
    };

    createUser: RequestHandler = (req, res) => {
        return this.userRepository.getAllPendingUsers().then((users: UserDocument[]) => {
            if (users && users.length && users.length >= 20) {
                return res.send({success: false});
            }

            return this.userRepository.addPendingUser(req.body).then(user => {
                return res.send({success: true});
            }).catch(err => {
                return res.send(err);
            });
        }).catch(err => {
            return res.send(err);
        });
    };

    getUsers: RequestHandler = (req, res) => {
        return this.userRepository.getAllUsers().then(users => {
            return res.send(users);
        }).catch(err => {
            return res.send(err);
        });
    };
}
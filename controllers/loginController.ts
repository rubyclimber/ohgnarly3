import {Settings} from '../services/settings';
import {RequestHandler} from 'express';
import bcrypt from 'bcryptjs';
import {Authentication as authentication} from '../services/authentication';
import {ResponseBuilder} from '../services/response';
import {UserRepository} from '../repositories/userRepository';


export class LoginController {
    private readonly userRepository: UserRepository;

    constructor(userRepository?: UserRepository) {
        this.userRepository = userRepository || new UserRepository();
    }

    login: RequestHandler = (req, res) => {
        const username = req.body.userName.toLowerCase();
        return this.userRepository.getUserByUserName(username).then(user => {
            const encryptedPassword = authentication.encryptString(req.body.password);
            if (user && user.password === encryptedPassword) {
                res.send({userId: user._id, success: true});
            } else {
                res.send({userId: null, success: false});
            }
        }).catch(err => {
            res.status(500);
            return res.send(ResponseBuilder.buildExceptionResponse(err));
        });
    };

    chatLogin: RequestHandler = (req, res) => {
        const username = req.body.userName.toLowerCase();
        return this.userRepository.getChatUser(username).then(user => {
            bcrypt.compare(req.body.password, user.password, (err: any, isSame: any) => {
                if (isSame) {
                    res.send({userId: user._id, success: true, socketUrl: Settings.socketUrl()});
                } else {
                    res.send({userId: null, success: false, socketUrl: ''});
                }
            });
        }).catch(err => {
            res.status(500);
            return res.send(ResponseBuilder.buildExceptionResponse(err));
        });
    };
}
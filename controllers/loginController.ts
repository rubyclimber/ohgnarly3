import {Settings} from '../services/settings';
import {Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import {ResponseBuilder} from '../services/response';
import {UserRepository} from '../repositories/userRepository';


export class LoginController {
    private readonly userRepository: UserRepository;

    constructor(userRepository?: UserRepository) {
        this.userRepository = userRepository || new UserRepository();
    }

    login = async (req: Request, res: Response) => {
        try {
            const username = req.body.userName.toLowerCase();
            const user = await this.userRepository.getUserByUserName(username);
            const result = await bcrypt.compare(req.body.password, user.password);

            if (result) {
                return res.send({userId: user._id, success: true});
            } else {
                return res.send({userId: null, success: false});
            }
        } catch (err) {
            res.status(500);
            return res.send(ResponseBuilder.buildExceptionResponse(err));
        }
    };

    chatLogin = async (req: Request, res: Response) => {
        try {
            const username = req.body.userName.toLowerCase();
            const user = await this.userRepository.getChatUser(username);
            const isSame = await bcrypt.compare(req.body.password, user.password);

            if (isSame) {
                res.send({userId: user._id, success: true, socketUrl: Settings.socketUrl()});
            } else {
                res.send({userId: null, success: false, socketUrl: ''});
            }
        } catch (err) {
            res.status(500);
            return res.send(ResponseBuilder.buildExceptionResponse(err));
        }
    };
}
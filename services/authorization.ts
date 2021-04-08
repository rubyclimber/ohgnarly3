import {Settings} from './settings';
import { Request, Response, NextFunction } from "express";
import {parseHeader} from './utilities';


export class Authorization {
    validateApiCall = (req: Request, res: Response, next: NextFunction) => {
        const sender: string = parseHeader(req.headers['sender']);
        const apiKey = parseHeader(req.headers['api-key']);

        if (this.isValidApiKey(sender, apiKey) || this.isLocal()) {
            next();
        } else {
            res.status(500);
            res.send({message: 'You do not have access to this API!'});
        }
    }

    getApiKey = (application: string) => {
        if (!(application in Settings.apiKeys())) {
            throw new TypeError('Invalid application name');
        }
        return Settings.apiKeys()[application];
    }

    private isValidApiKey(sender: string, apiKey: string) {
        return sender && apiKey && (Settings.apiKeys()[sender] == apiKey);
    }

    private isLocal() {
        return Settings.environment() == 'development';
    }
}
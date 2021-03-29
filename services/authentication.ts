import crypto from 'crypto'
import {Settings} from './settings';

export class Authentication {
    static encryptString: (input: string) => string = (input) => {
        const cipher = crypto.createCipher(Settings.cryptoAlgorithm(), Settings.cryptoPassword());
        let encrypted = cipher.update(input, 'utf8', 'base64');
        encrypted += cipher.final('base64');
        return encrypted;
    }
}
import {Settings} from './settings'

export class AllowedOrigins {
    origin(origin: string, callback: any) {
        if (!origin){
            return callback(null, true);
        }

        if (Settings.allowedOrigins().indexOf(origin) === -1) {
            return callback(new Error('Invalid origin'), false);
        }

        return callback(null, true);
    }
}
import {Authorization} from '../../services/authorization';
import {Request, Response} from 'express';

describe('Authorization', () => {
    let authorization: Authorization;

    describe('getApiKey', () => {
        beforeEach(() => {
            process.env.OH_GNARLY_CHAT_KEY = 'valid-api-key'
            authorization = new Authorization();
        });

        it('it should return a valid api-key for a valid app name', () => {
            const appName = 'ohGnarlyChat';


            const apiKey = authorization.getApiKey(appName);

            expect(apiKey).toEqual('valid-api-key');
        });

        it('it should raise and error for an invalid app name', () => {
            const appName = 'invalid-app-name';

            expect(authorization.getApiKey.bind(appName)).toThrowError(TypeError);
        });
    });

    describe('validateApiCall', () => {
        beforeEach(() => {
            process.env.OH_GNARLY_CHAT_KEY = 'valid-api-key'
            authorization = new Authorization();
        });

        it('sends a success if api key is valid', () => {
            const req = {headers: {'sender': 'ohGnarlyChat', 'api-key': 'valid-api-key'}} as any as Request;
            const res = {} as Response;
            const next = jest.fn();

            authorization.validateApiCall(req, res, next);

            expect(next).toBeCalledTimes(1);
        });

        it('sends an error response if api key is invalid', () => {
            const req = {headers: {'sender': 'any-sender', 'api-key': 'any-api-key'}} as any as Request;
            const res = {send: jest.fn(), status: jest.fn()} as any as Response;
            const next = jest.fn();

            authorization.validateApiCall(req, res, next);

            expect(res.status).toBeCalledWith(500);
            expect(res.send).toBeCalledWith({message: 'You do not have access to this API!'});
        });
    });
});
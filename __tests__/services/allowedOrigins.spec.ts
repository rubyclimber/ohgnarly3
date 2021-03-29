import {AllowedOrigins} from '../../services/allowedOrigins';

describe('AllowedOrigins', () => {
    let allowedOrigins: AllowedOrigins;
    describe('origin', () => {
        beforeEach(() => {
            process.env.ALLOWED_ORIGINS = '1|2'
            allowedOrigins = new AllowedOrigins();
        });

        it('should execute callback successfully if origin is falsy', () => {
            const callback = jest.fn();

            allowedOrigins.origin(undefined, callback);

            expect(callback).toBeCalledWith(null, true);
        });

        it('should execute callback successfully if origin is in allowed list', () => {
            const callback = jest.fn();

            allowedOrigins.origin('1', callback);

            expect(callback).toBeCalledWith(null, true);
        });

        it('should execute callback with error if origin is not in allowed list', () => {
            const callback = jest.fn();

            allowedOrigins.origin('3', callback);

            expect(callback).toBeCalledWith(new Error('Invalid origin'), false);
        });
    });
});
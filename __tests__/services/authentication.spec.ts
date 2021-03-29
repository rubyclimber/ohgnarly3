import {Authentication} from '../../services/authentication';

describe('Authentication', () => {
    describe('encryptString', () => {
        beforeEach(() => {
            process.env.CRYPTO_PASSWORD = 'MyTestCryptoPassword';
            process.env.CRYPTO_ALGORITHM = 'aes192';
            process.env.CRYPTO_PASSWORD = '01be4bce9ba61003b546a56539dc4c15';
        });

        it('should encrypt a string', () => {
            const password = 'test-password';

            const encrypted = Authentication.encryptString(password);

            expect(encrypted).toEqual('aEHT40d9+UriKjDRHgP28g==')
        });
    });
});
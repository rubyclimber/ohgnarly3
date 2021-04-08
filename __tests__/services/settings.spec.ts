import {Settings} from '../../services/Settings';

describe('Settings', () => {
    it('it should contain connection strings object', () => {
        process.env.CONNECTION_STRING = 'connection-string';

        const connectionStrings = Settings.connectionStrings();

        expect(connectionStrings).toEqual({ohgnarly: 'connection-string'});
    });

    it('it should contain allowed origins', () => {
        process.env.ALLOWED_ORIGINS = 'allowed1|allowed2';

        const allowedOrigins = Settings.allowedOrigins();

        expect(allowedOrigins).toEqual(['allowed1', 'allowed2']);
    });

    it('it should contain auth exclusion urls', () => {
        process.env.AUTH_EXCLUSION_URLS = 'exclusion1|exclusion2|exclusion3';

        const authExclusions = Settings.authExclusionUrls();

        expect(authExclusions).toEqual(['exclusion1', 'exclusion2', 'exclusion3']);
    });

    it('it should contain socket url', () => {
        process.env.SOCKET_URL = 'socket-url';

        expect(Settings.socketUrl()).toEqual('socket-url');
    });

    it('it should contain crypto password', () => {
        process.env.CRYPTO_PASSWORD = 'crypto-password';

        expect(Settings.cryptoPassword()).toEqual('crypto-password');
    });

    it('it should contain crypto algorithm', () => {
        process.env.CRYPTO_ALGORITHM = 'crypto-algorithm';

        expect(Settings.cryptoAlgorithm()).toEqual('crypto-algorithm');
    });

    it('it should contain gnarly chat api key', () => {
        process.env.OH_GNARLY_CHAT_KEY = 'gnarly-chat-key';

        const apiKeys = Settings.apiKeys();

        expect(apiKeys['ohGnarlyChat']).toEqual('gnarly-chat-key');
    });

    it('it should contain gnarly movies api key', () => {
        process.env.OH_GNARLY_MOVIES_KEY = 'gnarly-movies-key';

        const apiKeys = Settings.apiKeys();

        expect(apiKeys['ohGnarlyMovies']).toEqual('gnarly-movies-key');
    });

    it('it should contain message parser api key', () => {
        process.env.MESSAGE_PARSER_KEY = 'message-parser-key';

        const apiKeys = Settings.apiKeys();

        expect(apiKeys['messageParser']).toEqual('message-parser-key');
    });

    it('should contain environment', () => {
        process.env.NODE_ENV = 'my-env';

        const environment = Settings.environment();

        expect(environment).toEqual('my-env');
    });

    it('should contain crypto iv', () => {
        process.env.CRYPTO_IV = 'my_crypto_iv';

        const cryptoIv = Settings.cryptoIv();

        expect(cryptoIv).toEqual('my_crypto_iv');
    });
});
interface SettingsMap {
    [name: string]: string
}

export class Settings {
    static connectionStrings(): SettingsMap {
        return {
            ohgnarly: process.env.CONNECTION_STRING
        };
    }

    static allowedOrigins(): Array<string> {
        return process.env.ALLOWED_ORIGINS.split('|');
    }

    static authExclusionUrls(): Array<string> {
        return process.env.AUTH_EXCLUSION_URLS.split('|');
    }

    static socketUrl(): string {
        return process.env.SOCKET_URL;
    }

    static cryptoPassword(): string {
        return process.env.CRYPTO_PASSWORD;
    }

    static cryptoAlgorithm(): string {
        return process.env.CRYPTO_ALGORITHM;
    }

    static cryptoIv(): string {
        return process.env.CRYPTO_IV;
    }

    static environment(): string {
        return process.env.NODE_ENV;
    }

    static apiKeys(): SettingsMap {
        return {
            ohGnarlyMovies: process.env.OH_GNARLY_MOVIES_KEY,
            ohGnarlyChat: process.env.OH_GNARLY_CHAT_KEY,
            messageParser: process.env.MESSAGE_PARSER_KEY
        };
    }
}
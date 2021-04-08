import {parseHeader, sortMessages, stringifyParam} from '../../services/utilities';
import {ParsedQs} from 'qs';
import {MessageDocument} from '../../models/message';

describe('parseHeader', () => {
    it('should return header if the input is a string', () => {
        expect(parseHeader('this is my header value')).toEqual('this is my header value');
    });

    it ('should return an empty string if the input is a string[]', () => {
        expect(parseHeader(['1', '2'])).toEqual('');
    });

    it ('should return an empty string if the input is undefined', () => {
        expect(parseHeader(undefined)).toEqual('');
    });
});

describe('stringifyParam', () => {
    it('should return param if input is a string', async () => {
        expect(stringifyParam('this is my param value')).toEqual('this is my param value');
    });

    it('should return empty if input is string[]', async () => {
        expect(stringifyParam(['2', '1'])).toEqual('')
    });
    
    it('should return empty if input is ParsedQs', async () => {
        expect(stringifyParam({} as ParsedQs)).toEqual('');
    });

    it('should return empty if input is ParsedQs[]', async () => {
        expect(stringifyParam([] as ParsedQs[])).toEqual('');
    });
});

describe('sortMessages', () => {
    const message1 = {_id: '1', createdAt: new Date(2020, 3, 10, 13, 1, 4)} as any as MessageDocument;
    const message2 = {_id: '2', createdAt: new Date(2020, 3, 10, 13, 1, 6)} as any as MessageDocument;

    it('should swap messages if first is latest', async () => {
        expect(sortMessages([message2, message1])).toEqual([message1, message2]);
    });

    it('should not swap messages if first is earliest', async () => {
        expect(sortMessages([message1, message2])).toEqual([message1, message2]);
    });

    it('should not swap messages if creation times are equal', async () => {
        const message3 = {_id: '3', createdAt: new Date(2020, 3, 10, 13, 1, 6)} as any as MessageDocument;
        expect(sortMessages([message2, message3])).toEqual([message2, message3]);
    });
});
import {ParsedQs} from 'qs';
import {MessageDocument} from '../models/message';

export function parseHeader(header: string | string[] | undefined): string {
    if (header instanceof Array) {
        header = undefined;
    }
    return (header as string) || '';
}

export function stringifyParam(param: string | ParsedQs | string[] | ParsedQs[]): string {
    if (typeof param !== 'string') {
        param = undefined;
    }
    return (param as string) || '';
}

export function sortMessages(messages: MessageDocument[]): MessageDocument[] {
    return messages.sort((msg1: any, msg2: any) => {
        if (msg1.createdAt.getTime() < msg2.createdAt.getTime()) {
            return -1;
        } else if (msg1.createdAt.getTime() > msg2.createdAt.getTime()) {
            return 1;
        } else {
            return 0;
        }
    });
};

import {MessageController} from '../../controllers/messageController';
import {MessageRepository} from '../../repositories/messageRepository';
import {Request, Response} from 'express';
import {Message, MessageDocument} from '../../models/message';

describe('MessageController', () => {
    let messageController: MessageController;
    let messageRepository: MessageRepository;
    let req: Request;
    let res: Response;
    let io: any;
    const message1 = {createdAt: new Date(2020, 3, 10, 13, 1, 4)};
    const message2 = {createdAt: new Date(2020, 3, 10, 13, 1, 6)};

    beforeEach(() => {
        io = {emit: jest.fn()};
        res = {send: jest.fn()} as any as Response;
        messageRepository = new MessageRepository();
        messageController = new MessageController(io, messageRepository);
    });

    describe('getMessages', () => {
        beforeEach(() => {
            req = {query: {pageNumber: 1}} as any as Request;
        });

        it('should return messages', async () => {
            messageRepository.getRecentMessagesByPage = jest.fn().mockReturnValueOnce(Promise.resolve([message2, message1]));

            await messageController.getMessages(req, res);

            expect(res.send).toHaveBeenCalledWith([message1, message2]);
        });

        it('should raise error if lookup fails', async () => {
            messageRepository.getRecentMessagesByPage = jest.fn().mockReturnValueOnce(Promise.reject(new Error('failure')));

            try {
                await messageController.getMessages(req, res);
            } catch (err) {
                expect(res.send).toHaveBeenCalledWith(err);
            }
        });
    });

    describe('createMessage', () => {
        it('should insert a new message', async () => {
            const message = {} as MessageDocument;
            req = {body: {messageBody: 'hello', userId: '123'}} as Request;
            res.status = jest.fn().mockReturnValueOnce(res);
            res.end = jest.fn();
            messageRepository.addMessage = jest.fn().mockReturnValueOnce(Promise.resolve(message));

            await messageController.createMessage(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.end).toHaveBeenCalledTimes(1);
            expect(io.emit).toHaveBeenCalledWith('chat-message', message);
        });

        it('should raise an error if insert fails', async () => {
            messageRepository.addMessage = jest.fn().mockReturnValueOnce(Promise.reject(new Error('failure')));

            try {
                await messageController.createMessage(req, res);
            } catch (err) {
                expect(res.send).toHaveBeenCalledWith(err);
            }
        });
    });

    describe('searchMessages', () => {
        describe('input validation', () => {
            it('should send error if text and date are empty', async () => {
                messageRepository.searchByText = jest.fn();

                req.body = {searchDate: undefined, searchText: undefined};

                await messageController.searchMessages(req, res);

                expect(res.send).toHaveBeenCalledWith({error: 'Must provide search value'});
            });
        });

        describe('text search', () => {
            beforeEach(() => {
                req.body = {searchDate: undefined, searchText: 'some text'};
            });

            it('should return matching messages for text search', async () => {
                messageRepository.searchByText = jest.fn().mockReturnValueOnce([message2, message1]);

                await messageController.searchMessages(req, res);

                expect(res.send).toHaveBeenCalledWith([message1, message2]);
            });

            it('should raise error if text search fails', async () => {
                messageRepository.searchByText = jest.fn().mockReturnValueOnce(new Error());

                try {
                    await messageController.searchMessages(req, res);
                } catch (err) {
                    expect(res.send).toHaveBeenCalledWith(err);
                }
            });
        });

        describe('date search', () => {
            beforeEach(() => {
                req.body = {searchText: undefined, searchDate: new Date(2018, 3, 4)};
            });

            it('should return messages for valid date', async () => {
                const messages = [message2, message1];

                messageRepository.searchByDate = jest.fn().mockReturnValueOnce(messages);

                await messageController.searchMessages(req, res);

                expect(res.send).toHaveBeenCalledWith([message1, message2]);
            });
        });

        it('should raise error if date search fails', async () => {
            messageRepository.searchByDate = jest.fn().mockReturnValueOnce(new Error());

            try {
                await messageController.searchMessages(req, res);
            } catch (err) {
                expect(res.send).toHaveBeenCalledWith(err);
            }
        });
    });

    describe('addMessage', () => {
        it('should insert a new message', async () => {
            const message = {messageBody: 'hello', userId: '123'} as Message;
            messageRepository.addMessage = jest.fn().mockReturnValueOnce(Promise.resolve(message));

            await messageController.addMessage(message);

            expect(io.emit).toHaveBeenCalledWith('chat-message', message);
        });
    });
});
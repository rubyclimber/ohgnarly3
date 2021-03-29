import {Router} from 'express';
import {Routes} from '../../routes';

jest.mock('express');

describe('Routes', () => {
    let router: Router;
    let routes: Routes;

    describe('post routes', () => {
        let n: number = 0;
        beforeEach(() => {
            n++;
            router = {
                post: jest.fn(),
                get: jest.fn(),
                delete: jest.fn(),
                put: jest.fn()
            } as any as Router;
            routes = new Routes(jest.fn());
        });

        it('should configure /login route', () => {
            routes.configureRoutes(router);
            expect(router.post).toHaveBeenNthCalledWith(n, '/login', expect.anything());
        });

        it('should configure /chat-login route', () => {
            routes.configureRoutes(router);
            expect(router.post).toHaveBeenNthCalledWith(n, '/chat-login', expect.anything());
        });

        it('should configure /message route', () => {
            routes.configureRoutes(router);
            expect(router.post).toHaveBeenNthCalledWith(n, '/message', expect.anything());
        });

        it('should configure /movie route', () => {
            routes.configureRoutes(router);
            expect(router.post).toHaveBeenNthCalledWith(n, '/movie', expect.anything());
        });

        it('should configure /messages route', () => {
            routes.configureRoutes(router);
            expect(router.post).toHaveBeenNthCalledWith(n, '/messages', expect.anything());
        });

        it('should configure /check-username route', () => {
            routes.configureRoutes(router);
            expect(router.post).toHaveBeenNthCalledWith(n, '/check-username', expect.anything());
        });

        it('should configure /check-email route', () => {
            routes.configureRoutes(router);
            expect(router.post).toHaveBeenNthCalledWith(n, '/check-email', expect.anything());
        });

        it('should configure /create-user route', () => {
            routes.configureRoutes(router);
            expect(router.post).toHaveBeenNthCalledWith(n, '/create-user', expect.anything());
        });

        it('should configure /person route', () => {
            routes.configureRoutes(router);
            expect(router.post).toHaveBeenNthCalledWith(n, '/person', expect.anything());
        });

        it('should configure /ping route', () => {
            routes.configureRoutes(router);
            expect(router.post).toHaveBeenNthCalledWith(n, '/ping', expect.anything());
        });
    });

    describe('put routes', () => {
       beforeEach(() => {
           router = {
               post: jest.fn(),
               get: jest.fn(),
               delete: jest.fn(),
               put: jest.fn()
           } as any as Router;
           routes = new Routes(jest.fn());
       });

        it('should configure /movie route', () => {
            routes.configureRoutes(router);
            expect(router.put).toHaveBeenNthCalledWith(1, '/movie', expect.anything());
        });
    });

    describe('delete routes', () => {
       beforeEach(() => {
           router = {
               post: jest.fn(),
               get: jest.fn(),
               delete: jest.fn(),
               put: jest.fn()
           } as any as Router;
           routes = new Routes(jest.fn());
       });

        it('should configure /person/:personId route', () => {
            routes.configureRoutes(router);
            expect(router.delete).toHaveBeenNthCalledWith(1, '/person/:personId', expect.anything());
        });

        it('should configure /movie/:userId/:imdbid route', () => {
            routes.configureRoutes(router);
            expect(router.delete).toHaveBeenNthCalledWith(2, '/movie/:userId/:imdbid', expect.anything());
        });
    });

    describe('get routes', () => {
        let n: number = 0;

        beforeEach(() => {
            n++;
            router = {
                post: jest.fn(),
                get: jest.fn(),
                delete: jest.fn(),
                put: jest.fn()
            } as any as Router;
            routes = new Routes(jest.fn());
        });

        it('should configure /messages route', () => {
            routes.configureRoutes(router);
            expect(router.get).toHaveBeenNthCalledWith(n, '/messages', expect.anything());
        });

        it('should configure /users route', () => {
            routes.configureRoutes(router);
            expect(router.get).toHaveBeenNthCalledWith(n, '/users', expect.anything());
        });

        it('should configure /categories route', () => {
            routes.configureRoutes(router);
            expect(router.get).toHaveBeenNthCalledWith(n, '/categories', expect.anything());
        });

        it('should configure /new-movie route', () => {
            routes.configureRoutes(router);
            expect(router.get).toHaveBeenNthCalledWith(n, '/new-movie', expect.anything());
        });

        it('should configure /movies/:userId route', () => {
            routes.configureRoutes(router);
            expect(router.get).toHaveBeenNthCalledWith(n, '/movies/:userId', expect.anything());
        });

        it('should configure /movie-details/:onlineId route', () => {
            routes.configureRoutes(router);
            expect(router.get).toHaveBeenNthCalledWith(n, '/movie-details/:onlineId', expect.anything());
        });

        it('should configure /movie-search/:title/:page route', () => {
            routes.configureRoutes(router);
            expect(router.get).toHaveBeenNthCalledWith(n, '/movie-search/:title/:page', expect.anything());
        });

        it('should configure /movie-formats route', () => {
            routes.configureRoutes(router);
            expect(router.get).toHaveBeenNthCalledWith(n, '/movie-formats', expect.anything());
        });

        // it('should configure /conversations/:userId route', () => {
        //     routes.configureRoutes(router);
        //     expect(router.get).toHaveBeenNthCalledWith(n, '/conversations/:userId', expect.anything());
        // });

        it('should configure /user/:userId route', () => {
            routes.configureRoutes(router);
            expect(router.get).toHaveBeenNthCalledWith(n, '/user/:userId', expect.anything());
        });

        // it('should configure /conversation/:conversationId route', () => {
        //     routes.configureRoutes(router);
        //     expect(router.get).toHaveBeenNthCalledWith(n, '/conversation/:conversationId', expect.anything());
        // });
        //
        // it('should configure /conversation/messages/:conversationId route', () => {
        //     routes.configureRoutes(router);
        //     expect(router.get).toHaveBeenNthCalledWith(n, '/conversation/messages/:conversationId', expect.anything());
        // });

        it('should configure /movie/:userId/:imdbid route', () => {
            routes.configureRoutes(router);
            expect(router.get).toHaveBeenNthCalledWith(n, '/movie/:userId/:imdbid', expect.anything());
        });
    });
});
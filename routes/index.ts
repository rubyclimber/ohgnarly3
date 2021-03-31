import {Router} from 'express';
import {HomeController} from '../controllers/homeController';
import {LoginController} from '../controllers/loginController';
import {MovieController} from '../controllers/movieController';
import {MessageController} from '../controllers/messageController';
import {UserController} from '../controllers/userController';
import {PersonController} from '../controllers/personController';


export class Routes {
    io: any;
    router: Router;
    movieController: MovieController;
    messageController: MessageController;
    userController: UserController;
    loginController: LoginController;
    personController: PersonController;
    homeController: HomeController;

    constructor(io: any, router: Router) {
        this.io = io;
        this.router = router;
        this.movieController = new MovieController();
        this.messageController = new MessageController(io);
        this.userController = new UserController();
        this.loginController = new LoginController();
        this.personController = new PersonController();
        this.homeController = new HomeController();
    }

    buildRouteConfigurer = () => {
        return this.configureRoutes;
    }

    configureRoutes = () => {
        this.router.post('/login', this.loginController.login);
        this.router.post('/chat-login', this.loginController.chatLogin);
        this.router.post('/message', this.messageController.createMessage);
        this.router.post('/movie', this.movieController.createMovie);
        this.router.post('/messages', this.messageController.searchMessages);
        this.router.post('/check-username', this.userController.checkUsername);
        this.router.post('/check-email', this.userController.checkEmailAddress);
        this.router.post('/create-user', this.userController.createUser);
        this.router.post('/person', this.personController.createPerson)
        this.router.post('/ping', this.homeController.ping)
        //this.router.post('/update-movies', movieCtrl.updateMovies);
        this.router.get('/messages', this.messageController.getMessages);
        this.router.get('/users', this.userController.getUsers);
        this.router.get('/categories', this.homeController.getCategories);
        this.router.get('/new-movie', this.userController.createUser);
        this.router.get('/movies/:userId', this.movieController.getMovies);
        this.router.get('/movie-details/:onlineId', this.movieController.getMovieDetails);
        this.router.get('/movie-search/:title/:page', this.movieController.searchMovies);
        this.router.get('/movie-formats', this.movieController.getFormats);
        //this.router.get('/conversations/:userId', this.messageController.getConversations);
        this.router.get('/user/:userId', this.userController.getUser);
        //this.router.get('/conversation/:conversationId', this.messageController.getConversation);
        //this.router.get('/conversation/messages/:conversationId', this.messageController.getConversationMessages);
        this.router.get('/movie/:userId/:imdbid', this.movieController.getMovie);
        this.router.put('/movie', this.movieController.updateMovie);
        this.router.delete('/person/:personId', this.personController.deletePerson)
        this.router.delete('/movie/:userId/:imdbid', this.movieController.deleteMovie);
    }
}

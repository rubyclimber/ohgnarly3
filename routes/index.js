module.exports = function(io) {
    const express = require('express');
    const HomeController = require('../controllers/homeController');
    const showCtrl = require('../controllers/showController');
    const movieCtrl = require('../controllers/movieController');
    const messageCtrl = require('../controllers/messageController')(io);
    const userController = require('../controllers/userController')()
    const loginController = require('../controllers/loginController')()
    const personCtrl = require('../controllers/personController');

    const router = express.Router();
    const homeController = new HomeController(require('../models/category'))

    router.post('/login', loginController.login);

    router.post('/chat-login', loginController.chatLogin);

    router.get('/messages', messageCtrl.getMessages);

    router.post('/message', messageCtrl.createMessage);

    router.get('/users', userController.getUsers);

    router.get('/categories', homeController.getCategories);

    router.get('/new-movie', userController.createUser);

    router.get('/contacts/:userId', userController.getContacts);

    router.get('/movies/:userId', movieCtrl.getMovies);

    router.post('/movie', movieCtrl.createMovie);

    router.get('/movie-details/:onlineId', movieCtrl.getMovieDetails);

    router.get('/movie-search/:title/:page', movieCtrl.searchMovies);

    router.delete('/movie/:userId/:imdbid', movieCtrl.deleteMovie);

    router.put('/movie', movieCtrl.updateMovie);

    router.get('/shows/:userId', showCtrl.getUserShows);

    router.post('/show', showCtrl.createShow);

    router.put('/show', showCtrl.updateShow);

    router.get('/show-search/:title/:page', showCtrl.searchShows);

    router.get('/all-messages/:userId', messageCtrl.getAllMessages);

    router.post('/messages', messageCtrl.searchMessages);

    router.get('/movie-formats', movieCtrl.getFormats);

    router.get('/conversations/:userId', messageCtrl.getConversations);

    router.get('/user/:userId', userController.getUser);

    router.get('/conversation/:conversationId', messageCtrl.getConversation);

    router.get('/conversation/messages/:conversationId', messageCtrl.getConverationMessages);

    router.post('/log', homeController.logObject);

    router.get('/movie/:userId/:imdbid', movieCtrl.getMovie);

    router.post('/check-username', userController.checkUsername);

    router.post('/check-email', userController.checkEmailAddress);

    router.post('/create-user', userController.createUser);

    router.get('/active-users', userController.getLoggedInUsers);

    router.post('/person', personCtrl.createPerson)

    router.delete('/person/:personId', personCtrl.deletePerson)

    //router.post('/update-movies', movieCtrl.updateMovies);
    router.post('/ping', homeController.ping)

    router.get('/messages/all', messageCtrl.migrateMessages);

    router.get('/messages/all', messageCtrl.migrateMessages);
    
    router.get('/movies', movieCtrl.getAllMovies);

    return router;
}
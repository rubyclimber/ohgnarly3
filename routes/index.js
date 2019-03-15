module.exports = function(io) {
    const express = require('express');
    const homeCtrl = require('../controllers/homeController');
    const showCtrl = require('../controllers/showController');
    const movieCtrl = require('../controllers/movieController');
    const messageCtrl = require('../controllers/messageController')(io);

    const router = express.Router();

    router.post('/login', homeCtrl.login);

    router.post('/chat-login', homeCtrl.chatLogin);

    router.get('/messages', messageCtrl.getMessages);

    router.post('/message', messageCtrl.createMessage);

    router.get('/users', homeCtrl.getUsers);

    router.get('/categories', homeCtrl.getCategories);

    router.get('/new-movie', homeCtrl.createUser);

    router.get('/contacts/:userId', homeCtrl.getContacts);

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

    router.get('/user/:userId', homeCtrl.getUser);

    router.get('/conversation/:conversationId', messageCtrl.getConversation);

    router.get('/conversation/messages/:conversationId', messageCtrl.getConverationMessages);

    router.post('/log', homeCtrl.logObject);

    router.get('/movie/:userId/:imdbid', movieCtrl.getMovie);

    router.post('/check-username', homeCtrl.checkUsername);

    router.post('/check-email', homeCtrl.checkEmailAddress);

    router.post('/create-user', homeCtrl.createUser);

    router.get('/active-users', homeCtrl.getLoggedInUsers);

    //router.post('/update-movies', movieCtrl.updateMovies);

    return router;
}
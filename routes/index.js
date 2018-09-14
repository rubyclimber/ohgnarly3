module.exports = function(io) {
    var express = require('express');
    var router = express.Router();
    var homeCtrl = require('../controllers/homeController');
    var showCtrl = require('../controllers/showController');
    var movieCtrl = require('../controllers/movieController');
    var messageCtrl = require('../controllers/messageController')(io);

    router.post('/login', homeCtrl.login);

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

    return router;
}
/**
 * Import dependencies
 */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const debug = require('debug')('ohgnarly:server');
const socket = require('socket.io');
const authorization = require('./services/authorization');
const cors = require('cors');
const settings = require('./settings');

/**
 * Initialize mongodb connection
 */
mongoose.Promise = global.Promise;
mongoose.connect(settings.connectionStrings.ohGnarly, {useMongoClient: true});

/**
 * Create express app and set middleware components
 */
let app = express();
var port = normalizePort(process.env.PORT || '1985');
app.set('port', port);

let io = socket(app.listen(port));

app.on('error', onError);
app.on('listening', onListening);

io.on('connection', onSocketConnect);

let index = require('./routes/index')(io);
let api = require('./routes/api')(io);
const messageCtrl = require('./controllers/messageController')(io);

const authUrlRegExp = new RegExp(`\/((?!${settings.authExclusionUrls.join('|')})np.)*`);

const allowedOrigins = settings.allowedOrigins;
app.use(cors({
    origin: (origin, callback) => {
        if (!origin){
            return callback(null, true);
        }

        if (allowedOrigins.indexOf(origin) === -1) {
            return callback(new Error('Invalid origin', false));
        }

        return callback(null, true);
    }
}));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(authUrlRegExp, authorization.validateApiCall);
app.use('/api', api);
app.use('/', index);


function normalizePort(val) {
    console.log('port value: ' + val);
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

function onSocketConnect(socket) {
  socket.on('server-message', messageCtrl.addMessage);
  socket.on('disconnect', () => {
    console.log('disconnected');
  });
}
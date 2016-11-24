// Import config
var config = require('./config');

// Babel
require('babel-register');

// React
var swig  = require('swig'); // templating system, use Jade instead?
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var routes = require('./app/routes');

// Express
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser'); // parse body request

var app = express();

var _ = require('underscore');

// Set app
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Put Express stuff before React Middleware

// React Middleware
app.use(function(req, res) {
  Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
      var page = swig.renderFile('views/index.html', { html: html });
      res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found')
    }
  });
});

/**
 * Socket.io stuff.
 */
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var onlineUsers = 0;

io.sockets.on('connection', function(socket) {
  onlineUsers++;

  console.log("There are " + onlineUsers + " users online.");

  io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });

  socket.on('disconnect', function() {
    onlineUsers--;
    io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });
  });

  socket.on('pressPlay', function() {
    io.sockets.emit('playVideo');
  });

  socket.on('pressPause', function() {
    io.sockets.emit('pauseVideo');
  });

  socket.on('pressReset', function() {
    io.sockets.emit('resetVideo');
  });

  socket.on('pressSync', function() {
    io.sockets.emit('syncVideo');
  });

});

server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

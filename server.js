// Import config
var config = require('./config');

// Requests/async

var async = require('async');
var request = require('request');

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

/**
 * GET /api/currentvid
 * Returns current video id
 */
var currentvid = 'JS91p-vmSf0'
app.get('/api/current', function(req, res, next) {
  res.send({videoid: currentvid});
});

/**
 * GET /api/searchvid
 * Makes a search on Youtube using the Youtube Data Api
 */
app.get('/api/searchvid/:string', function(req, res, next) {
  var searchquery = req.params.string;
  var youtubeSearchApiUrl = 'https://www.googleapis.com/youtube/v3/search'
  /*
   * GET https://www.googleapis.com/youtube/v3/search
   * params:
   *  part: string
   *    research properties to get
   *  q: string
   *    search query
   *  key: string
   *    Youtube Api Key
   */
  var requrl = youtubeSearchApiUrl+"?part=snippet&q="+searchquery+"&key="+config.youtube_api_key;
  request.get(requrl, function(err, request, body) {
    res.send(JSON.parse(body));
  });
});


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

  socket.on('pressSync', function(data) {
    io.sockets.emit('syncVideo', data);
  });

  socket.on('setNewVideoId', function(data) {
    io.sockets.emit('pushNewVideoId', data);
    currentvid = data.newVideoId;
  });

});

server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

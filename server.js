var express = require('express');
//var server = express.createServer();
// express.createServer()  is deprecated. 

var rootPath = __dirname;

var server = express(); // better instead
server.configure(function(){
  server.use('/media', express.static(rootPath + '/media'));
  server.use('/bc', express.static(rootPath + '/bower_components'));
  server.use(express.static(rootPath + '/public'));
});

server.listen(3000);
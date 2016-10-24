var app = require('express')();
var http = require('http').Server(app);
var Server = require('socket.io');
var io = new Server();
io.attach(http);

var users=[];

io.on('connection', function(socket){
  io.emit('chat message', 'a user connected');

  socket.on('new user',function(message,callback){
    if(nicknames.indexOf(message)!=-1) {
      callback(false);
    }else {
      callback(true);
      socket.nickname=message;
      nicknames.push(socket.nickname);
      io.sockets.emit('update_users', users);
    }
  });

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.on('disconnect', function(){
    io.emit('chat message', 'user disconnected');
    console.log('user disconnected');
  });
});

http.listen(3001, function(){
  console.log('listening on *:3001');
});

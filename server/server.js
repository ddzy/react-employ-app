const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const IO = require('socket.io');
const Chat = require('./model').getModel('chat');



// work with express
const app = express();
const server = require('http').Server(app);
const io = IO(server);


io.on('connection', (socket) => {
  socket.on('sendmsg', ({ from, to, msg }) => {
    
    // 定制from+to => 唯一id, 便于查询
    const chatid = [from, to].sort().join('_');
    Chat.create({ chatid, from, to, content: msg }, (err, doc) => {
      io.emit('receivemsg', Object.assign({}, doc));
    });

  });
});


const userRouter = require('./user');

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter);


server.listen(8888, () => {
  console.log('Server is listening at port 8888...');
});




const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const cors = require('./utils/cors');
const moment = require('moment');
const { Users } = require('./utils/users');

const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
app.use(cors);

const GLOBAL_ROOM = 'global'
const users = new Users();

io.on('connection', (socket) => {
    console.log('New user connected');
    socket.on('join', ({ username }) => {
        const user = users.getUserById(username.userId);
        
        if (user) {
            users.removeUserById(user.userId);    
        }

        socket.join(GLOBAL_ROOM);
        users.addUser(socket.id, username);

        io.to(GLOBAL_ROOM).emit('userCountChange', users.getUsersCount());
        io.to(GLOBAL_ROOM).emit('userJoinLeft', { username, action: 'join' });
    })
    

    socket.on('sendMessage', ({ payload }) => {
        const { sender, message } = payload;
        io.to(GLOBAL_ROOM).emit('newMessage', {
            sender,
            message,
            sendedAt: moment().format('YYYYMMDDHHmmss')
        })
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
        const user = users.removeUser(socket.id);

        if (user) {
            io.to(GLOBAL_ROOM).emit('userCountChange', users.getUsersCount());
            io.to(GLOBAL_ROOM).emit('userJoinLeft', { username: user, action: 'left' });
        }
    });
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})

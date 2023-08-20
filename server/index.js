const express = require('express')
const app = express()
const http = require('http')
const {Server} = require('socket.io')
const cors = require('cors')

app.use(cors())

const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        origins: '192.168.5.220:8080',
        methods: ['GET','POST']
    }
})

io.on('connection', socket =>{
    console.log(`user id : ${socket.id}`);
    socket.on('joinRoom', roomId => {
        socket.join(roomId);
    });

    socket.on('btn', data => {
        // Broadcast the button state data to the room
        io.to(data.roomId).emit('btn', { buttons: data.buttons, roomId: data.roomId });
        console.log(data.roomId,data.buttons);
    });

})

server.listen(3000,()=>{
    console.log(`listen to 3000`);
})
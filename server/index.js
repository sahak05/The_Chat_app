

const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const {addUser, removeUser, getuser, getUserInRoom} = require('./user')

//require() permet de loire les fichier passer en argument et les executes

//lecture de la documentation de socket.io

const PORT = process.env.PORT || 5000 // on specifie la lecture sur ce port 

const router = require('./router')

const app = express()
const server = http.createServer(app)
const io = socketio(server)//une instance de socketio


io.on('connection', (socket) =>{ //connection and disconnection

    socket.on('join', ({name,room}, callback)=>{  //with a callback function
        const {error, user} = addUser({id:socket.id,name,room}) //recuperation du front end pour le emitting event (gettting the data)

        if(error) return callback(error)

        socket.emit('message', {user:'admin', text:`${user.name}, welcome to the room ${user.room}` })

        socket.broadcast.to(user.room).emit('message', {user:'admin', text:`${user.name}, has joined`}) //send a message to all besides the  user who is send it

        socket.join(user.room)

        callback();//if there is an error
    })


    socket.on('sendMessage', (message, callback) => {
        const user = getuser(socket.id)
    
        io.to(user.room).emit('message', { user: user.name, text: message })
    
        callback()
    })

    socket.on('disconnect', ()=>{
        console.log('User had left!!')
    })

})

app.use(router)

server.listen(PORT, ()=>console.log(`Server has started on port ${PORT}`))
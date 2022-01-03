

const express = require('express')
const socketio = require('socket.io')
const http = require('http')

//require() permet de loire les fichier passer en argument et les executes

//lecture de la documentation de socket.io

const PORT = process.env.PORT || 5000 // on specifie la lecture sur ce port 

const router = require('./router')

const app = express()
const server = http.createServer(app)
const io = socketio(server)//une instance de socketio

io.on('connection', (socket) =>{ //connection and disconnection
    console.log('We have a connection!!!!!')

    socket.on('disconnect', ()=>{
        console.log('User had left!!')
    })

})

app.use(router)

server.listen(PORT, ()=>console.log(`Server has started on port ${PORT}`))
const data = require('http').createServer()
const io = require('socket.io')(data);

const  express = require('express')
const app = express()
const port = 8080
app.use(express.static(__dirname + '/build'))

app.get('/',(req,res,next)=>{
    res.send(__dirname + '/build/index.html');
})

const server = app.listen(port,
    ()=>{
console.log("server is listening at  port ",port);
})
io.listen(server)
var connections = new Map()
const peers = io.of('/my-namespace')
peers.on('connection',socket =>{
    console.log(socket.id);
    socket.emit('connected-success',{success:socket.id})
    connections.set(socket.id,socket)
    socket.on('disconnect',()=>{
        console.log('disconected')
        connections.delete(socket.id)
    })
    socket.on('offerOrAnswer',(data)=>{
        for (const[socketID,socket] of connections.entries()){
            if (socketID!==data.socketID){
                console.log(socketID,data.payload.type)
                socket.emit('offerOrAnswer',data.payload)
            }
        }
    })
    socket.on('candidate',(data)=>{
        for (const[socketID,socket] of connections.entries()){
            if (socketID!==data.socketID){
                console.log(socketID,data.payload.type)
                socket.emit('candidate',data.payload)
            }
        }
    })

})
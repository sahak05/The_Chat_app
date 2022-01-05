import React, {useState, useEffect} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client' 
import './Chat.css'
import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'
import TextContainer from '../TextContainer/TextContainer'

let socket;//we gonna pass data inside

const Chat = ({location}) => {

    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [message, setMessage] = useState('')
    const [users, setUsers] = useState('')
    const [messages, setMessages] = useState([])
    const ENDPOINT = 'https://react-chat-app-v.herokuapp.com/'

    useEffect(() =>{

        const {name, room} = queryString.parse(location.search)

        socket = io(ENDPOINT, {transports: ["websocket", "polling", "flashsocket"]}); //end point 
        /*More information
        about this error handling
        here https://stackoverflow.com/questions/44628363/socket-io-access-control-allow-origin-error 
        */
        setName(name)

        setRoom(room)
        
        socket.emit('join', {name,room}, ()=>{
            
        }) //to pass the data to the server side

        return ()=>{ //disconnect event 
            socket.emit('disconnect')

            socket.off()//off the instance of the socket
        }
    }, [ENDPOINT, location.search]) //specify when the value in the array change


    useEffect(()=>{
        socket.on('message', (message)=>{
            setMessages([...messages, message])
        })

        socket.on("roomData", ({ users }) => {
            setUsers(users);
          })
    }, [messages])

    //function for sending messages cause is the user who is sending 
    const sendMessage = (event)=>{
        event.preventDefault()

        if(message){
            socket.emit('sendMessage', message, ()=>setMessage('') )
        }
    }




    return (
        <div className='outerContainer'>
            <div className='container'>

                <InfoBar room={room}/>

                <Messages messages={messages} name={name}/>

                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer users={users}/>
        </div>
    )
}

export default Chat


//useState and useEffect for Hooks and lifecycle methods

/* Location est un props qui nous vient de react router
location.search nous renvoie dans le link
Et on utilise les donnees renvoyes pour former des objets*/
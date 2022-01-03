import React, {useState, useEffect} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client' 


let socket;//we gonna pass data inside

const Chat = ({location}) => {

    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const ENDPOINT = 'localhost:5000'

    useEffect(() =>{

        const {name, room} = queryString.parse(location.search)

        socket = io(ENDPOINT, { transports : ['websocket', 'polling', 'flashsocket'] }); //end point 
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
    }, [ENDPOINT, location.search]) //speify when the value in the array change


    useEffect(()=>{
        socket.on('message', (message)=>{
            setMessages([...messages, message])
        })
    }, [messages])

    //function for sending messages cause is the user who is sending 
    const sendMessage = (event)=>{
        event.preventDefault()

        if(message){
            socket.emit('sendMessage', message, ()=>setMessage('') )
        }
    }


    console.log(message, messages)

    return (
        <div className='outerCOntainer'>
            <div className='container'>
                <input 
                value={message} 
                onChange={(event)=> setMessage(event.target.value)}
                onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null} 
                />

            </div>
        </div>
    )
}

export default Chat


//useState and useEffect for Hooks and lifecycle methods

/* Location est un props qui nous vient de react router
location.search nous renvoie dans le link
Et on utilise les donnees renvoyes pour former des objets*/
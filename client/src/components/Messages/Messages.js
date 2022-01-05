import React from 'react'
import ScrollToBottom from 'react-scrollable-feed'
import './Messages.css'

const Messages = ({messages, name}) => {
    return (
       <ScrollToBottom>
           {messages.map((message, i) => <div key={i}><Message message={message} name ={name}/></div>)}
       </ScrollToBottom> 
    )
}

export default Messages

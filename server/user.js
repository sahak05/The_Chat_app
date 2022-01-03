//to managing users 
//joining

//quitting

const users=[]

const addUser =({id, name, room})=>{ //adding
    
    //si user entre plusieurs mots en nom on veut pouvoir tous 
    //concatener et lowerCases

    name = name.trim().toLowerCase()
    room = room.trim().toLowerCase()

    const existingUser = users.find((user) =>{user.room === room && user.name === name }) //if user exist already in the room

    if(existingUser){
        return {error:'Username is taken'}
    }

    const user  = {id, name, room}
    users.push(user)
    return {user}
}

const removeUser =(id)=>{ //remove user

    const index = users.findIndex((user)=>user.id === id)

    if(index !== -1){
        return users.slice(index,1)[0]
    }
}

const getuser = (id)=>{ //see if user
    users.find((user)=>user.id === id)
}

const getUserInRoom = (room)=>{users.filter((user)=>user.room === room)} //array of the user in that room

module.exports = {addUser, removeUser, getuser, getUserInRoom} //export them
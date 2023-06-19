const socket= io('http://localhost:8081');

//Set DOM Elements
const form = document.getElementById('send-container');
const messageInput= document.getElementById('MessageInput');
const messageContainer= document.querySelector('.container');

//For Audio
var audio =new Audio('Ting.mp3');


//Functions to append
const append =(message,position)=>{
    const messageElement = document.createElement('div')
messageElement.innerText= message;
messageElement.classList.add('message');
messageElement.classList.add(position);
messageContainer.append(messageElement);
if(position == 'left'){
audio.play();
}
}



const name = prompt("Enter Your Name To Join");
socket.emit('new-user-joined',name)

socket.on('user-joined',name=>{
append(`${name} joined the chat`,'right') 

} )
 
socket.on('receive',data=>{
    append(`${data.name}:${data.message}`,'left') 
    
    } )
   

    socket.on('left',name =>{
        append(`${name} left the chat`,'right')
    })

// Sending server final Message
    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        const message=messageInput.value;
        append(`You:${message}`,'right');
        socket.emit('send',message);
        messageInput.value='';
        })
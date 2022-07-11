const socket=io()
let name;

let textarea=document.querySelector('#textarea')
let messageArea=document.querySelector('.message_area')


do{
    name=prompt('Please enter your name : ')
}
while(!name)


textarea.addEventListener('keyup',(e)=>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value);
    }
})


function sendMessage(mseg){
    let msg={
        user: name,
        message: mseg.trim()
    }

    //append

    appendMessage(msg,'outgoing')
    scrollToBottom()
    textarea.value='';

    //send to server

    socket.emit('message',msg)


}

function appendMessage(msg,type)
{
    let mainDiv=document.createElement('div')

    // <div>
            // markup
    // </div>

    let className=type
    mainDiv.classList.add(className,'message')

    let markup=`
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `

    mainDiv.innerHTML=markup;
    messageArea.appendChild(mainDiv)
}


//recieve message

socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
    scrollToBottom()
})


//scroll to bottom

function scrollToBottom(){
    messageArea.scrollTop=messageArea.scrollHeight
}
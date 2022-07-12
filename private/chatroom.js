//const { isOmittedExpression } = require("typescript");
//import { format } from "path";
import {load} from "./load.js"






//window.onload = () => {
//  
//  loadChatroomArr();
//
//  
//    
//};





export async function loadChatroomArr() {
  const resp = await fetch("/api/chatroom");
  if (resp.status === 200) {
    const result = await resp.json();
    const chatroomArr = result.chatroomArr
    const id = result.user.id
    // load chatroom
    let htmlStr = "";
    for (const chatroom of chatroomArr) {
      htmlStr += /*html */ 
      //<li
      //    id="item-${chatroom.id}"
      //    class="list-group-item d-flex justify-content-between align-items-start"
      //>
      //    <div class="ms-2 me-auto">
      //        <div class="fw-bold">${chatroom.name}</div>
      //        Content for list item Join
      //    </div>
      //</li>;

      `   <div class="messages">
        <div id="${chatroom.id}"></div>
      <div class="avatar">
          <img src="../image/${chatroom.image}" alt="QQ">
      </div>
      <!--<button id = "click" type="button">Click Me!</button>-->
      <div class="friend">
          <div class="user">${chatroom.name}</div>
          <div class="text"><li id="item-${chatroom.id}"><li></div>
      </div>
  </div>`

 

    //<button type="button" class="join">${chatroom.id}</button>

    


    document.querySelector(".list-chat").innerHTML = htmlStr;
    document.querySelector(".messages> div:first-child")
    let count = 1;
    let room;
    console.log("count", count)
  
    //join chatroom
  
    document.querySelectorAll(".messages").forEach((element) => 
    element.addEventListener(("click"), async () => {
      const text = element.querySelector(".messages > div:first-child").id
      
      
      
//let text = ele.getAttribute("id"); 
//console.log(text)
      //const result = docu(element.firstChild)
      //const element = document.getElementById("id");
      //console.log(element);
      
      
      room = text
      console.log("room", room)
  
      //Once click, show submit bar and message box
      let messageStr = 
      //<ul id="noticeboard"></ul><form id="form" action="">
      //<input id="input" autocomplete="off" /><button>Send</button>
    //</form>//

    ` <div class="xcontainer">

    <div class="xmsg-header">
        <div class="xmsg-header-img">
            <img src="https://i.pinimg.com/564x/67/b6/30/67b63069f6d0d71ae0158b9a5ea51c1e.jpg" alt="QQ">
        </div>
        <div class="xactive">
            <h4>Misty</h4>
            <h6>1 hour ago</h6>
        </div>
        <div class="xheader-icons">
            <!-- <i class="fa fa-info-circle"></i> -->
        </div>
    </div>
    
    <div class="xchat-page">
        <div class="xchats">

        /////////////////////////////////
            <div class="xmsg-page">
            <ul id="noticeboard"></ul>

             

                <form id="form" action="">
                <div class="xinput-group">
                    <input type="text" class="xform-control" placeholder="write message...">
                    <button class="xinput-group-append">
                        <span class="xinput-group-text"><i class="fa fa-paper-plane"></i></span>
                    </button>

                </div>
                </form>


            </div>`
  
      //let submitStr = `
    //document.querySelector("#a").innerHTML = submitStr
    document.querySelector(".content").innerHTML = messageStr
    //select html item form and input and html noticeboard item
    const form = document.getElementById('form');
    const input = document.getElementById('input');
       const messages = document.getElementById('noticeboard');

       `<div class="received-chats">
       <div class="received-chats-img">
           <img src="https://i.pinimg.com/564x/e9/5d/93/e95d930d80735444bf983b10dc4153ad.jpg" alt="QQ">
       </div>
       <div class="received-msg">
           <div class="received-msg-inbox">
               <p>Hi!! This is message from Chris</p>
               <span class="time">11:05 AM | June 30</span>
           </div>
       </div>
   </div>

   <div class="outgoing-chats">
       <div class="outgoing-chats-img">
           <img src="https://i.pinimg.com/564x/67/b6/30/67b63069f6d0d71ae0158b9a5ea51c1e.jpg" alt="QQ">
       </div>
       <div class="outgoing-msg">
           <div class="outgoing-msg-inbox">
               <p>Hi, there</p>
               
           </div>
           <div class="outgoing-time">
   
               <span class="outgoing-time">11:25 AM | June 30</span>
           </div>
       </div>
   </div>`
  
       //load chatroom message
       const result = await load(room);
       console.log(`{room}`, result)
       let a;
       for(let i of result) {
        
        if(parseInt(i.sender_id) !== id) {
  
       const mine = document.createElement('div');
       mine.classList.add("myself");
       mine.textContent = i.content
       messages.appendChild(mine);
       window.scrollTo(0, document.body.scrollHeight);}
  
       else {const others = document.createElement('div');
       others.classList.add("others");
       others.textContent = i.content
       messages.appendChild(others);
       window.scrollTo(0, document.body.scrollHeight);}
       }
  
       //Upload message to server
       form.addEventListener('submit', async function(e) {
        e.preventDefault();
        //console.log(room)
        const content = input.value;
        if(!input.value){
          return
        }
        const resp = await fetch(`/api/chatroom/message/${room}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({content}),
        }); 
          
          const mine = document.createElement('div');
          mine.classList.add("myself");
          mine.textContent = content
          messages.appendChild(mine);
          window.scrollTo(0, document.body.scrollHeight)
      
        if (input.value) {
          //socket.emit('message', input.value);
          input.value = '';
        }
        
      })
      
    }))
   


       //frontend show message
       
       let socket = io.connect();
       //console.log("hihi", count)

       if (count == 1) {
        socket.on("message", (data)=> {
          console.log("receiving message from ", data.chatroom_id)
          
          const numberRoom = parseInt(room);
          console.log("myPanel", numberRoom)
          //console.log(typeof data.chatroom_id)
          if(data.chatroom_id == numberRoom){
            const msg = data.content
            console.log("msg", msg)

            const others = document.createElement('div');
       others.classList.add("others");
       others.textContent = msg
       messages.appendChild(others);
       window.scrollTo(0, document.body.scrollHeight);

           
           count = count + 1;
           console.log("count", count)
          } else return
         
         })} else {return} 
         //socket.on("disconnect", ()=>{})
      
       //send message
       
    
    

      
    }
  }
  
}

//const { isOmittedExpression } = require("typescript");
//import { format } from "path";
import { load } from "./load.js"






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
     
      <div class="friend">
          <div class="user">${chatroom.name}</div><div id="item-${chatroom.id}" class="list-group-item d-flex justify-content-between align-items-start"></div>
      </div>
  </div>`



      //<button type="button" class="join">${chatroom.id}</button>




      document.querySelector(".list-chat").innerHTML = htmlStr;

      let count = 1;
      let room;
      console.log("count", count)

      //join chatroom

      document.querySelectorAll(".messages").forEach((element) =>
        element.addEventListener(("click"), async () => {
          const text = element.querySelector(".messages > div:first-child").id
          room = text
          console.log("room", room)
          const name = element.querySelector(".messages .user").innerHTML
          console.log("name", name)
          const imagePath = element.querySelector(".messages .avatar >img").src
          console.log("path", imagePath)

          //Once click, show submit bar and message box
          let messageStr =
            //<ul id="noticeboard"></ul><form id="form" action="">
            //<input id="input" autocomplete="off" /><button>Send</button>
            //</form>//

            ` <div class="xcontainer">

    <div class="xmsg-header">
        <div class="xmsg-header-img">
            <img src="${imagePath}" alt="QQ">
        </div>
        <div class="xactive">
            <h4>${name}</h4>
            <h6>1 hour ago</h6>
        </div>
        <div class="xheader-icons">
            <!-- <i class="fa fa-info-circle"></i> -->
        </div>
    </div>
    
    <div class="xchat-page">
        <div class="xchats">

        
            <div class="xmsg-page">
            <ul id="noticeboard"></ul>

             

                
                <div class="xinput-group">
                <form id="form" action="">
                    <input type="text" id = "input" class="xform-control" size="100" placeholder="write message...">
                    <button class="xinput-group-append">
                        <span class="xinput-group-text"><i class="fa fa-paper-plane"></i></span>
                    </button>
                    </form>

                </div>
               


            </div>`

          //let submitStr = `
          //document.querySelector("#a").innerHTML = submitStr
          document.querySelector(".content").innerHTML = messageStr
          //select html item form and input and html noticeboard item
          const form = document.getElementById('form');
          const input = document.getElementById('input');
          const messages = document.getElementById('noticeboard');

          function receive(a, b) {
            return `<div class="xreceived-chats">
       <div class="xreceived-chats-img">
           <!--<img src="https://i.pinimg.com/564x/e9/5d/93/e95d930d80735444bf983b10dc4153ad.jpg" alt="QQ">-->
       </div>
       <div class="xreceived-msg">
           <div class="xreceived-msg-inbox">
               <p>${a}</p>
               <span class="xtime">${b}</span>
           </div>
       </div>
   </div>`
          }
          //console.log(receive("boy", "1530"))

          function send(a, b) {
            return `<div class="xoutgoing-chats">
       <div class="xoutgoing-chats-img">
           <!--<img src="https://i.pinimg.com/564x/67/b6/30/67b63069f6d0d71ae0158b9a5ea51c1e.jpg" alt="QQ">-->
       </div>
       <div class="xoutgoing-msg">
           <div class="xoutgoing-msg-inbox">
               <p>${a}</p>
               
           
           
   
               
               </div>
               <br><span class="xoutgoing-time">${b}</span>
           
       </div>
   </div>`}

          //<div class="xoutgoing-time">
          //</div>

          //load chatroom message
          const result = await load(room);
          console.log(`{room}`, result)
          let a;
          //console.log("id", id)
          for (let i of result) {
            //console.log("sender", parseInt(i.sender_id))
            //console.log("mine", id)

            if (parseInt(i.sender) !== id) {

              const mine = document.createElement('div');
              //String(date.getHours()).padStart(2, '0');
              const time = String((new Date(i.time_started).getHours())).padStart(2, '0') + ':' + String(new Date(i.time_started).getMinutes()).padStart(2, '0')
              //console.log(time)
              mine.innerHTML = receive(i.content, time);
              //mine.classList.add("myself");
              //mine.textContent = i.content
              messages.appendChild(mine);
              window.scrollTo(0, document.body.scrollHeight);
            }

            else {
              const others = document.createElement('div');
              //console.log("send + 1")
              const time = String((new Date(i.time_started).getHours())).padStart(2, '0') + ':' + String(new Date(i.time_started).getMinutes()).padStart(2, '0')
              others.innerHTML = send(i.content, time);
              // others.classList.add("others");
              // others.textContent = i.content
              messages.appendChild(others);
              window.scrollTo(0, document.body.scrollHeight);
            }
          }

          //Upload message to server
          form.addEventListener('submit', async function (e) {
            e.preventDefault();
            let sentTime = new Date()
            let time = String(sentTime.getHours()).padStart(2, '0') + ':' + String(sentTime.getMinutes()).padStart(2, '0')
            //console.log(room)
            //console.log(input.value)
            const content = input.value;
            if (!input.value) {
              return
            }
            const resp = await fetch(`/api/chatroom/message/${room}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ content, sentTime }),
            });

            const mine = document.createElement('div');

            mine.innerHTML = send(content, time);
            //mine.classList.add("myself");
            //mine.textContent = i.content
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
        socket.on("message", (data) => {
          function receive(a, b) {
            return `<div class="xreceived-chats">
       <div class="xreceived-chats-img">
           <!--<img src="https://i.pinimg.com/564x/e9/5d/93/e95d930d80735444bf983b10dc4153ad.jpg" alt="QQ">-->
       </div>
       <div class="xreceived-msg">
           <div class="xreceived-msg-inbox">
               <p>${a}</p>
               <span class="xtime">${b}</span>
           </div>
       </div>
   </div>`
          }
          const messages = document.getElementById('noticeboard');

          console.log("receiving message from ", data.chatroom_id)

          const numberRoom = parseInt(room);
          console.log("myPanel", numberRoom)
          //console.log(typeof data.chatroom_id)
          if (data.chatroom_id == numberRoom) {
            const msg = data.content
            console.log("msg", msg)
            //const time = data.time.time_started
            const time = String((new Date(data.time.time_started).getHours())).padStart(2, '0') + ':' + String(new Date(data.time.time_started).getMinutes()).padStart(2, '0')
            console.log("time", time)

            const others = document.createElement('div');
            console.log("posted", receive(msg, time));
            others.innerHTML = receive(msg, time);
            // others.classList.add("others");
            // others.textContent = i.content
            messages.appendChild(others);
            window.scrollTo(0, document.body.scrollHeight)

            //const others = document.createElement('div');
            //others.classList.add("others");
            //others.textContent = msg
            //messages.appendChild(others);
            //window.scrollTo(0, document.body.scrollHeight);


            count = count + 1;
            console.log("count", count)
          } else return

        })
      } else { return }
      //socket.on("disconnect", ()=>{})

      //send message





    }
  }

}

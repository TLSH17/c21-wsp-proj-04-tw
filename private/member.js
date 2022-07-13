//import {load} from "./load.js"
import { loadChatroomArr } from "./chatroom.js"

window.onload = async () => {
  loadProfile();
  loadChatroomArr();
  loadfriendlist();
  loadmyProfile();


  console.log("On load")

  const socket = io.connect(); // You can pass in an optional parameter like "http://localhost:8080"
  socket.on("message", (data) => {

    //receive message from server
    const msg = data.content

    //insert message number in chatroom
    const chatroomId = data.chatroom_id;
    //console.log(chatroomId)
    const ele = document.querySelector(`#item-${chatroomId} > span`);
    if (!ele) {
      const spanEle = document.createElement("span");
      spanEle.classList.add("badge");
      spanEle.classList.add("bg-primary");
      spanEle.classList.add("rounded-pill");
      spanEle.innerHTML = "1";
      document.querySelector(`#item-${chatroomId}`).appendChild(spanEle);
    } else {
      const count = parseInt(ele.textContent, 10);
      ele.innerHTML = String(count + 1);
    }


  });
};

let page = 1;
let counter = 1;

async function loadProfile(page) {

  const resp = await fetch(`/member/profiles?page=${page}`, {
    method: "GET",
  });
  const result = await resp.json();
  //const age = new Date().getFullYear - result.user_info.date_of_birth.getFullYear()

  //process page
  const PAGE = result.current_page
  console.log("PAGE", PAGE)
  const totalPage = result.total_page

  //process age
  const jsonDate = result.user_info.date_of_birth;
  const age =
    parseInt(new Date().getFullYear()) -
    parseInt(new Date(jsonDate).getFullYear());

  //process hobby
  const hobbyArr = result.hobby;
  let hobbyStr = "";
  for (let i of hobbyArr) {
    hobbyStr += `<div>${i.content}</div>`;
  }
  // console.log(hobbyStr);

  //process image

  const imageArr = result.image;
  const imageResult = imageArr[0].file_name;
  // console.log("REsult!!:" + imageResult);
  // console.log("heheheheh :" + imageArr);


  let imageStr = `<div class="carousel-item active">
    <img src="./image/${imageResult}" class="d-block w-100" alt="..."/>
  </div>`;
  // if (imageArr.length === 1) {
  //   return;
  // }
  for (let i = 1; i < imageArr.length; i++) {
    imageStr += `<div class="carousel-item">
        <img src="./image/${imageArr[i].file_name}" class="d-block w-100" alt="..."/>
      </div>`;
  }
  // console.log("Image.Str:" + imageStr);

  //process indicator
  let indicatorStr = ` <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>`;
  // if (imageArr.length === 1) {
  //   return;
  // }
  for (let i = 1; i < imageArr.length; i++) {
    indicatorStr += `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" aria-label="Slide ${i + 1
      }"></button>`;
  }

  let htmlStr = `
  <div class="card">
                
  <div id=${page}>
      <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
    <div class="carousel-indicators">
     ${indicatorStr}
    </div>
    <div class="carousel-inner">
     ${imageStr}
    </div>
    <button class="carousel-control-prev" type="button"  data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button"  data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
  </div>
  <div id = "info${page}"></div>
  <div class = "hobby">${hobbyStr}</div>
  </div>

  <div class="user">
      <!--<img class="user" src="https://i.pinimg.com/564x/b4/4b/18/b44b18fc8ad2904b87d577ab4d957055.jpg"
          alt="Solar">-->
      <div class="profile"></div>
      <div class="name">${result.user_info.username} </br><span>${age}</span></div>
      <div class="local">
          <i class="fas fa-map-marker-alt"></i>
          <span>18 kilometers</span>
      </div>
  </div>

</div><!--card-->

<div class="buttons">

  <form id="cross">
  <div type="submit" id="no" class="no" data-id="${result.user_info.id}">
      <i class="fas fa-times"></i>
  </div>
  </form>

  <div class="star">
  <i class="fas fa-star fa"></i>
  </div>

  <form id="like">
    <div type="submit" id="heart" class="heart" data-id="${result.user_info.id}">
        <i class="fas fa-heart"></i>
    </div>
  </form> 

</div>`;

  document.querySelector(".content").innerHTML = htmlStr;

  document.querySelector("#home").addEventListener(("click"), () => {
    loadProfile(counter);
  })

  document
    .querySelector(".carousel-control-next")
    .addEventListener("click", () => {
      if (PAGE === 1) {
        counter = 1
      }

      counter += 1


      console.log("counter: ", counter)
      loadProfile(counter);
    });

  document
    .querySelector(".carousel-control-prev")
    .addEventListener("click", () => {
      if (PAGE === totalPage) {
        counter = totalPage
      }

      counter -= 1

      console.log("counter: ", counter)
      loadProfile(counter);
    });




  //list friend list//








  // Click the heart icon, friendship_level become 1
  document.querySelectorAll("#heart").forEach((ele) =>
    ele.addEventListener("click", async (e) => {
      e.preventDefault();
      // console.log(`Enter into like`)


      const targetid = e.currentTarget.dataset["id"];
      console.log("Here is the target id: " + targetid);

      const like = true;
      // const currentuserid = result.user_info.id;
      // console.log("Herelike:" + currentuserid);

      // const resp = await fetch(`/member/likeProfile`, { method: "POST" });
      const resp = await fetch(`/member/likeProfile`, {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({ like, targetid }),
      });

      // console.log(`passed fetch`)
      const result = await resp.json();

      // // console.log(`passed resp.json from server`)

      // console.log("user.info.username: " + result.user_info.username);


      if (resp.status === 400) {
        const result = await resp.json();
        alert(result.message);
      }
    })
  )


  //
  // Click the cross icon, friendship_level become 1
  document.querySelectorAll("#no").forEach((ele) =>
    ele.addEventListener("click", async (e) => {
      // e.preventDefault();

      const targetid = e.currentTarget.dataset["id"];
      console.log(targetid);

      const disLike = true;
      // const resp = await fetch(`/member/likeProfile`, { method: "POST" });
      const resp = await fetch(`/member/dislikeProfile`, {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({ disLike, targetid }),
      })
      // const result = await resp.json

      if (resp.status === 400) {
        const result = await resp.json();
        alert(result.message);
      }
    })
  )
}

async function loadfriendlist() {
  // console.log("enterfunctionhere!!! ");
  const resp = await fetch("/member/friendlsit", { method: "GET" });
  // console.log("passthefetch");
  // console.log("passthefetch");
  const friendlist = await resp.json();
  // console.log(friendlist);

  const friendlistNum = (friendlist.friendlist).length;
  // console.log(friendlistNum);

  // console.log(friendlist.friendlist[0].user_id_received);
  // console.log("finish_friendlist");
  let htmlStr = "";

  for (let i = 0; i < friendlistNum; i++) {
    console.log(friendlist.friendlist[i].username);
    htmlStr += `
    <div class="messages">
      <div class="friend">
        <div class="user">${friendlist.friendlist[i].username}</div>
      </div>
    </div>
    `;
    document.querySelector(".friendInput").innerHTML = htmlStr;
  }

  // let htmlStr = "";
  // for (let friends in friendlistObj) {
  // let htmlStr = "";
  // console.log(friends);
  // console.log(friend.id);
  // console.log("Friendname" + friend.username);
  // htmlStr += `<div>${friend.username}</div>`;
  // }
}


async function loadmyProfile() {
  const resp = await fetch("/member/profiles", { method: "GET" });
  // console.log("passthefetch");
  const myinfo = await resp.json();
  // console.log(myinfo);

  const myname = myinfo.user_info.username;
  // console.log(myname);

  const myPicLocation = myinfo.image[0].file_name
  // console.log(myPicLocation);

  const myid = myinfo.user_info.id;


  //my name
  const myUserName = `
  <div style="font-size: 20px">${myname}<div><br/>
  <div>Your User id is : ${myid}</div>`;
  document.querySelector(".myProfile").innerHTML = myUserName;

  // my profile photo
  const myPic = `<img src="image/${myPicLocation}">`;
  document.querySelector(".myPic").innerHTML = myPic;

  // my user id



}

//var invisible = document.getElementById('invisible');
//document.querySelector("#click").addEventListener(("click"), () => {
//  var item = document.createElement('div');
//  item.innerHTML =     `<ul id="messages"></ul>`;
//  invisible.appendChild(item);
//  })


// const resultFromFE = req.body
// resultFromFE.like -> ture


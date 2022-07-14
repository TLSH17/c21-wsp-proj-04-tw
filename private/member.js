//import {load} from "./load.js"
import { loadChatroomArr } from "./chatroom.js";
//import { filter } from "./filter.js"

let counter = 1;
let page = 1;

window.onload = async () => {
  loadmyProfile();
  loadfriendlist();
  loadProfile();
  loadChatroomArr();

  console.log("On load");

  const socket = io.connect(); // You can pass in an optional parameter like "http://localhost:8080"
  socket.on("message", (data) => {
    //receive message from server
    const msg = data.content;

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




async function loadProfile(page) {
  console.log("page", page)
  const resp = await fetch(`/member/profiles?page=${page}`, {
    method: "GET",
  });
  const result = await resp.json();
  console.log(result)
  //const age = new Date().getFullYear - result.user_info.date_of_birth.getFullYear()
  // console.log("showresult")
  // console.log(result);

  //process page
  const PAGE = result.current_page;
  // console.log("PAGE", PAGE)
  const totalPage = result.total_page;

  //process age
  const jsonDate = result.user_info.date_of_birth;
  // console.log(jsonDate)
  const age =
    parseInt(new Date().getFullYear()) -
    parseInt(new Date(jsonDate).getFullYear());

  // console.log("age" + age)
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
  console.log("REsult!!:" + imageResult);
  console.log("heheheheh :" + imageArr);

  let imageStr = `<div class="carousel-item active">
    <img src="./image/${imageResult}" class="d-block w-100" alt="..."/>
  </div>`;
  //if (imageArr.length === 1) {
  //  return;
  //}
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
  <form id="filter">
  <div class="input_area">
      <!-- <div class="regItem col-sm-2"> -->
          <label for="age-select">Choose sex:</label>
          <!-- <input type="text" placeholder="Age" class="inputbox1" name="age-select" id ="age-select" required /> -->
          <select id="sex">
          
          <option value="M">M</option>
          <option value="F">F</option>
          <option value="All" selected>All</option>
          
        </select>
          
          
      <!-- </div> -->

      <!-- <div class="regItem col-sm-2"> -->
          <label for="hobby">Hobbies:   </label>
          <!-- <input type="text" placeholder="Hobbies" class="inputbox2" required /> -->
          <select id="hobby">
              <option value="party">party</option>
              <option value="outdoor">outdoor</option>
              <option value="yoga">yoga</option>
              <option value="dining">dining</option>
              <option value="foodie">foodie</option>
              <option value="tennis">tennis</option>
              <option value="movie">movie</option>
              <option value="all">all</option>

          </select>
      <!-- </div> -->

  </div>
  <div class="submit_button col-sm-6">
  <input type="submit" value="Submit" />
</div>
</form>

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
      <div class="name">${result.user_info.username}</div></br>
      <div class="name profileAge">AGE : ${age}</div>
      <div class="local">
          <i class="fas fa-map-marker-alt"></i>
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

  <form id="like" onClick="location.href=location.href">
    <div type="submit" id="heart" class="heart" data-id="${result.user_info.id}">
        <i class="fas fa-heart"></i>
    </div>
  </form> 

</div>`;


  document.querySelector(".content").innerHTML = htmlStr;

  document.querySelector("#home").addEventListener("click", () => {
    loadProfile(counter);
    // <<<<<<< HEAD
  })


  document.querySelector("#logout").addEventListener(("click"), async () => {
    // window.location.href = "/index.html";
    console.log("hihi")
    const resp = await fetch("/logout", {
      method: "DELETE",
    })
    console.log("yo")
    console.log(resp)
    if (resp.ok === true) {
      window.location.href = "/"
    }
  });


  document.querySelector("#filter").addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Register!");
    const form = e.target;
    const formData = new FormData();

   

    formData.append("sex", form["sex"]["value"]);
    formData.append("hobby", form["hobby"]["value"]);

    const resp = await fetch("/member/filter", {
      method: "POST",
      body: formData,

    });

   

  const result = await resp.json();
  console.log(result);
  if(!result.message){
    
    window.alert("Please subscribe our channel to view more profiles!!")
    window.location.href = "/member.html"
  } else { 
    window.alert("Not found in current database!!");
    window.location.href = "/member.html";}
    
  });
  // >>>>>>> 76d8dcbb0484fdcf6a569d4b5b8641697d1f3128

  document
    .querySelector(".carousel-control-next")
    .addEventListener("click", () => {
      if (PAGE === 1) {
        counter = 1;
      }

      counter += 1;

      console.log("counter: ", counter);
      loadProfile(counter);
    });

  document
    .querySelector(".carousel-control-prev")
    .addEventListener("click", () => {
      if (PAGE === totalPage) {
        counter = totalPage;
      }

      counter -= 1;

      console.log("counter: ", counter);
      loadProfile(counter);
    });



  //console.log(`page: ${page}`)

  //console.log(`page: ${page}`)


  //console.log(result.friendlist.length);
  const friendListLength = result.friendlist.length;


  // Button (<3 ) : Click the heart icon, friendship_level  +1
  document.querySelectorAll("#heart").forEach((ele) =>
    ele.addEventListener("click", async (e) => {
      e.preventDefault();
      // console.log(`Enter into like`)

      if (friendListLength >= 4) {
        window.alert("If you want to like more profiles, please subscribe for more features");
        return;
      }



      const targetid = e.currentTarget.dataset["id"];
      console.log("Here is the target id: " + targetid);

      const like = true;
      // const currentuserid = result.user_info.id;
      // console.log("Herelike:" + currentuserid);

      // const resp = await fetch(`/member/likeProfile`, { method: "POST" });
      const resp = await fetch(`/member/likeProfile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
  );

  //
  // // Click the cross icon, friendship_level  -1
  // document.querySelectorAll("#no").forEach((ele) =>
  //   ele.addEventListener("click", async (e) => {
  //     // e.preventDefault();

  //     const targetid = e.currentTarget.dataset["id"];
  //     console.log(targetid);

  //     const disLike = true;
  //     // const resp = await fetch(`/member/likeProfile`, { method: "POST" });
  //     const resp = await fetch(`/member/dislikeProfile`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json", },
  //       body: JSON.stringify({ disLike, targetid }),
  //     })
  //     // const result = await resp.json

  //     if (resp.status === 400) {
  //       const result = await resp.json();
  //       alert(result.message);
  //     }
  //   })
  // )

  // Button (X)
  document.querySelector("#no").addEventListener("click", () => {
    //process page
    const PAGE = result.current_page
    // console.log("PAGE", PAGE)
    const totalPage = result.total_page

    if (PAGE === 1) {
      counter = 1
    }

    counter += 1


    console.log("counter: ", counter)
    loadProfile(counter);
  });

  // Button (Star) - developing...
  document.querySelector(".star").addEventListener("click", () => {
    //process page
    console.log("ohno")
    window.alert("Please subscribe for more features.")
  });


  //     const disLike = true;
  //     // const resp = await fetch(`/member/likeProfile`, { method: "POST" });
  //     const resp = await fetch(`/member/dislikeProfile`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ disLike, targetid }),
  //     });
  //     // const result = await resp.json

  //     if (resp.status === 400) {
  //       const result = await resp.json();
  //       alert(result.message);
  //     }
  //   })
  // );
}

async function loadfriendlist() {
  // console.log("enterfunctionhere!!! ");
  const resp = await fetch("/member/friendlsit", { method: "GET" });

  const friendlist = await resp.json();

  const friendlistNum = (friendlist.friendlist).length;

  console.log(friendlistNum);


  let htmlStr = "";

  for (let i = 0; i < friendlistNum; i++) {
    // console.log(friendlist.friendphoto[i].file_name);
    htmlStr += `
    <div class="messages">
      <div class="friend">
        <div class="user">${friendlist.friendlist[i].username}</div>
        <img src="image/${friendlist.friendphoto[i].file_name}" class= "friendpic" ></img>
      </div>
    </div>
    `;
    document.querySelector(".friendInput").innerHTML = htmlStr;
  }


}

async function loadmyProfile() {
  const resp = await fetch("/member", { method: "GET" });
  // console.log("passthefetch");
  const myinfo = await resp.json();
  console.log(myinfo);
  console.log("=========")

  const myname = myinfo.result[0].username;
  console.log("My username is : " + myname);

  const myPicLocation = myinfo.result[0].file_name;
  // console.log(myPicLocation);

  const myid = myinfo.result[0].id;

  //my name & id
  const myUserName = `
  <div style="font-size: 20px; margin :10px">Greetings. ${myname}. What are you thinking right now? <div>
  `;
  document.querySelector(".myProfile").innerHTML = myUserName;

  // // my profile photo
  const myPic = `<img src="image/${myPicLocation}">`;
  document.querySelector(".myPic").innerHTML = myPic;

  // myimage = myinfo.myimage;
  // console.log(myimage);
}

//var invisible = document.getElementById('invisible');
//document.querySelector("#click").addEventListener(("click"), () => {
//  var item = document.createElement('div');
//  item.innerHTML =     `<ul id="messages"></ul>`;
//  invisible.appendChild(item);
//  })
var animateButton = function (e) {

  e.preventDefault;
  //reset animation
  e.target.classList.remove('animate');

  e.target.classList.add('animate');
  setTimeout(function () {
    e.target.classList.remove('animate');
  }, 700);
};

// var animateButton = function (e) {

//   e.preventDefault;
//   //reset animation
//   e.target.classList.remove('animate');

//   e.target.classList.add('animate');
//   setTimeout(function () {
//     e.target.classList.remove('animate');
//   }, 700);
// };

// var bubblyButtons = document.getElementsByClassName("bubbly-button");

// for (var i = 0; i < bubblyButtons.length; i++) {
//   bubblyButtons[i].addEventListener('click', animateButton, false);
// }

// const resultFromFE = req.body
// resultFromFE.like -> ture

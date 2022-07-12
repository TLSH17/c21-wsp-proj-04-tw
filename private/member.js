

window.onload = async () => {
  loadProfile();
  likeProfile();

  console.log("On load")
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
  console.log(hobbyStr);

  //process image

  const imageArr = result.image;
  const imageResult = imageArr[0].file_name;
  console.log("REsult!!:" + imageResult);
  console.log(imageArr);


  let imageStr = `<div class="carousel-item active">
    <img src="./image/${imageResult}" class="d-block w-100" alt="..."/>
  </div>`;
  if (imageArr.length === 1) {
    return;
  }
  for (let i = 1; i < imageArr.length; i++) {
    imageStr += `<div class="carousel-item">
        <img src="./image/${imageArr[i].file_name}" class="d-block w-100" alt="..."/>
      </div>`;
  }
  console.log(imageStr);

  //process indicator
  let indicatorStr = ` <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>`;
  if (imageArr.length === 1) {
    return;
  }
  for (let i = 1; i < imageArr.length; i++) {
    indicatorStr += `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" aria-label="Slide ${i + 1
      }"></button>`;
  }

  let htmlStr = `
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
<div id = "info${page}">${result.user_info.username}${age}</div>
<div class = "hobby">${hobbyStr}</div>
</div>`;

  document.querySelector("#memo-board").innerHTML = htmlStr;

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

  //console.log(`page: ${page}`)
}

//var invisible = document.getElementById('invisible');
//document.querySelector("#click").addEventListener(("click"), () => {
//  var item = document.createElement('div');
//  item.innerHTML =     `<ul id="messages"></ul>`;
//  invisible.appendChild(item);
//  })



async function likeProfile() {
  document.querySelectorAll("#heart").forEach((ele) =>
    ele.addEventListener("click", async (e) => {
      const id = e.target.parentElement.dataset.id;
      const like = true;
      // const resp = await fetch(`/member/likeProfile`, { method: "POST" });
      const resp = await fetch(`/member/likeProfile`, {
        method: "POST",
        handler: { "Content-Type": "application/json", },
        body: JSON.stringify({ like }),
      })
      const result = await resp.json

      if (resp.status === 400) {
        const result = await resp.json();
        alert(result.message);
      }
    })
  )
};


// const resultFromFE = req.body
// resultFromFE.like -> ture
let page = 1;

window.onload = async () => {
loadProfile();
console.log(2)
}

async function loadProfile() {

    const resp = await fetch(`/profiles?page=${page}`, {
        method: "GET"
});
    const result = await resp.json();
    //const age = new Date().getFullYear - result.user_info.date_of_birth.getFullYear()
    
    //process age
    const jsonDate = (result.user_info.date_of_birth)
    const age = parseInt(new Date().getFullYear()) - parseInt(new Date(jsonDate).getFullYear());
    console.log(age)

    //process hobby
    const hobbyArr = result.hobby
    let hobbyStr = "";
    for(let i of hobbyArr) {
        hobbyStr += `<div>${i.content}</div>`
    }
    console.log(hobbyStr)

    //process image
    const imageArr = result.image
    console.log(imageArr)
    let imageStr = `<div class="carousel-item active">
    <img src="../image/${imageArr[0].file_name}" class="d-block w-100" alt="..."/>
  </div>`;
  if(imageArr.length === 1){
    return;
  }
    for(let i = 1; i < imageArr.length; i++){
        console.log(i)
        imageStr +=  `<div class="carousel-item">
        <img src="../image/${imageArr[i].file_name}" class="d-block w-100" alt="..."/>
      </div>`
    }
    console.log(imageStr)

    //process indicator
    let indicatorStr = ` <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>`
    if(imageArr.length === 1){
        return;
      }
      for(let i = 1; i < imageArr.length; i++){
        console.log(i)
        indicatorStr += `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" aria-label="Slide ${i+1}"></button>`
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

  

 

</div>

<div id = "info${page}">${result.user_info.username}${age}</div>
<div class = "hobby">${hobbyStr}</div>


</div>`



    document.querySelector("#memo-board").innerHTML = htmlStr;


}


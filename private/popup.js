// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");
document.querySelector("#myBtn").addEventListener(("click"), async()=>{
    console.log("hihi")
    const resp = await fetch("/member", {
        METHOD: "GET"
    })
    const result = await resp.json();
    console.log(result)
    const nationality = !result[0].nationality?"Nationality":result[0].nationality
    const nickName = !result[0].nick_name?"Nick Name":result[0].nick_name
    const description = !result[0].description?"Description":result[0].description
    const email = !result[0].email?"Email":result[0].email
    const interestedInType = !result[0].interested_in_type?"Interested In Type":result[0].interested_in_type
    const height = !result[0].height?"Height":result[0].height
    const zodiacSign = !result[0].zodiac_signs?"Zodiac Sign":result[0].zodiac_signs
    console.log(nationality)
    console.log(description)

    document.getElementById("description").placeholder = description
    document.getElementById("gender").child.value = "neutral"

                //document.querySelector("#empty").innerHTML = formStr;
    })



// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
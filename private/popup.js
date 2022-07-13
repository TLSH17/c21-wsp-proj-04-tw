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
    const username = result[0].username
    const id = result[0].id
    const nationality = !result[0].nationality?"Nationality":result[0].nationality
    const nickName = !result[0].nick_name?"Nick Name":result[0].nick_name
    const description = !result[0].description?"Description":result[0].description
    const email = !result[0].email?"Email":result[0].email
    const interestedInType = !result[0].interested_in_type?"Interested In Type":result[0].interested_in_type
    //const height = !result[0].height?"Height":result[0].height
    const zodiacSign = !result[0].zodiac_signs?"Zodiac Sign":result[0].zodiac_signs
    console.log(nationality)
    console.log(description)

    let htmlStr = `Hey ${username}, you can update your profile here`


    document.getElementById("hey").innerHTML = htmlStr
    document.getElementById("description").placeholder = description
    document.getElementById("nickname").placeholder = nickName
    document.getElementById("nationality").placeholder = nationality
    document.getElementById("email").placeholder = email
    document.getElementById("interestedInType").placeholder = interestedInType
    //document.getElementById("height").placeholder = height
    document.getElementById("zodiacSigns").placeholder = zodiacSign
    //document.getElementById("gender").child.value = "neutral"

                //document.querySelector("#empty").innerHTML = formStr;
                

                document.querySelector("#form-register").addEventListener("submit", async (e) => {
                
                console.log("Register!")
                e.preventDefault();
                const form = e.target;
                const formData = new FormData();
    
                
                
                formData.append("id", id);
                formData.append("gender", form.NewGender.value);
                console.log("gender", form.NewGender.value)
                formData.append("nick_name", form.NewNickName.value);
                console.log("nickname", form.NewNickName.value)

                formData.append("interested_in_gender", form.NewInterestedGender.value);
                formData.append("date_of_birth", form.NewBirth.value);
                //console.log("formdata" + formData);
                console.log("description", form.NewDescription.value)

                formData.append("description", form.NewDescription.value);
                formData.append("nationality", form.NewNationality.value);
                formData.append("email", form.NewUserEmail.value);
                formData.append("interestedType", form.NewInterestedType.value);
                //formData.append("height", form.NewHeight.value);
                formData.append("zodiac_signs", form.NewZodiac.value);
    
                formData.append("image", form.image.files[0]);
    
                console.log("formdata" + formData);
                console.log("form" + form)
    
                const resp = await fetch("/member/edit", {
                    method: "POST",
                    body: formData,
    
                });
    
                const result = await resp.json();
    
                if (result.success) {
                    alert("Your profile has been successfully updated.");
                    window.location.href = "/member.html"
                } else if (!result.success) {
                    alert("Please try again");
                }
            
                });
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
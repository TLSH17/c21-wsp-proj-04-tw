
window.onload = async () => {
    initLoginForm();
    registerForm();
    // verificationPicFile(file);
    // upLoadPic();
    console.log("on load!")
};

function initLoginForm() {
    document.querySelector("#form-login").addEventListener("submit", async (e) => {
        e.preventDefault();
        const form = e.target;
        const username = form.username.value;
        const password = form.password.value;
        const resp = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });
        const result = await resp.json();

        if (!result.success) {
            console.log("result.Not.success");
            alert("Invalid Username or Password. Please try again.");
        } else {
            window.location.href = "/member.html";
        }
    });
}


function registerForm() {
    // console.log("register on load!")
    document.querySelector("#form-register").addEventListener("submit", async (e) => {
        console.log("Register!")
        e.preventDefault();
        const form = e.target;
        const formData = new FormData();

        formData.append("username", form.NewUserName.value);
        formData.append("password", form.NewUserPassword.value);
        formData.append("nickName", form.NewNickName.value);
        formData.append("gender", form.NewGender.value);
        formData.append("interested_in_gender", form.NewInterestedGender.value);
        formData.append("date_of_birth", form.NewBirth.value);
        formData.append("description", form.NewDescription.value);
        formData.append("nationality", form.NewNationality.value);
        formData.append("email", form.NewUserEmail.value);
        formData.append("interestedType", form.NewInterestedType.value);
        formData.append("height", form.NewHeight.value);
        formData.append("zodiac_signs", form.NewZodiac.value);

        formData.append("image", form.image.files[0]);

        console.log("formdata" + formData);
        console.log("form" + form)

        const resp = await fetch("/newUser", {
            method: "POST",
            body: formData,

        });

        const result = await resp.json();

        if (result.success) {
            console.log("Success Register");
            alert("Success. You can log in now.");
            window.location.href = "/"
        } else if (!result.success) {
            console.log("The account has been registered");
            alert("The account has been registered. Please choose another name.");
        }

    });
}


// function verificationPicFile(file) {
//     var filePath = file.value;
//     if (filePath) {
//         var filePic = file.files[0];
//         var reader = new FileReader();
//         reader.onload = function (e) {
//             var image = new Image();
//             image.onload = function () {
//                 var width = image.width;
//                 var height = image.height;
//                 if (width >= 600 | height >= 600) {
//                     alert("Sorry, The max dimensions is 600*600. Thanks ");
//                     file.value = "";
//                     return false;
//                 }
//             };
//             image.src = data;
//         };
//         reader.readAsDataURL(filePic);
//     } else {
//         return false;
//     }
// }
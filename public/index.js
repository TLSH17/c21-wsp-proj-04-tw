
window.onload = async () => {
    initLoginForm();
    registerForm();
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
            window.location.href = "/homepage.html";
        }
    });
}


function registerForm() {
    // console.log("register on load!")
    document.querySelector("#form-register").addEventListener("submit", async (e) => {
        console.log("Register!")
        e.preventDefault();
        const form = e.target;
        const username = form.NewUserName.value;
        const password = form.NewUserPassword.value;
        const gender = form.NewGender.value;
        const interested_in_gender = form.NewInterestedGender.value;
        const date_of_birth = form.NewBirth.value;
        const description = form.NewDescription.value;

        console.log(username, password, gender, interested_in_gender, date_of_birth, description)

        const resp = await fetch("/newUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password, gender, interested_in_gender, date_of_birth, description }),
        });
        // console.log(resp);
        const result = await resp.json();
        // console.log(result);

        // if (result.success) {
        //     alert("Success !!!");
        //     //   form.reset();
        // } else {
        //     alert(result.message);
        // }
    });
}
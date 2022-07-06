
window.onload = async () => {
    initLoginForm();
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
            console.log("result.Not.success")
        } else {
            window.location.href = "/homepage.html";
        }
    });
}

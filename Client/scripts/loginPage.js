// const inputdataArr = JSON.parse(localStorage.getItem("userData")) || [];
const messageLogin = document.getElementById("messageLogin");
const logo = document.getElementById("logo");
logo.style.cursor = "pointer";
logo.addEventListener("click", () => {
  window.location.href = "index.html";
});
let loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  await fetch("https://63c59ffce1292e5bea27a4a8.mockapi.io/users")
    .then((res) => res.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        let user = data[i];
        console.log(user);
        if (user.email == email.value && user.password == password.value) {
          messageLogin.textContent = "Login Successful!";
          localStorage.setItem("isAuth", true);
          
          setTimeout(() => {
            messageLogin.style.display = "none";
            window.location.href = "index.html";
          }, 300);
          break;
        } else {
          messageLogin.textContent = "Incorrect Credentials!";
          setTimeout(() => {
            messageLogin.style.display = "none";
          }, 3000);
        }
      }
    });
  messageLogin.style.display = "block";
});

// to merge HOMEPAGE
// window.location.href= "hp.html"

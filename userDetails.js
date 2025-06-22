let form ;
let mail ;
let pwd;
let userdetails = [];

function getUserName(){
  let userdata = window.localStorage.getItem('username');
  let loggedin = window.localStorage.getItem('isLoggedIn');
  if(userdata!=null && loggedin == "true")
  document.getElementById('welcomeMsg').innerHTML = 'Welcome '+ userdata +' !';
  else
  document.getElementById('welcomeMsg').innerHTML = 'Welcome Guest !';
}

function showLogout(){
  let userdata = window.localStorage.getItem('isLoggedIn');
  if(userdata !== "true"){
    document.getElementById('logoutMenu').style.display = 'none';
  } else{
    document.getElementById('registerMenu').style.display = 'none';
    document.getElementById('loginMenu').style.display = 'none';
  }
}

function logout(){
  window.localStorage.setItem("isLoggedIn", "false");
  window.location.href = "index.html";
}

function addform(){
  getCartCount();
  getUserName();
  form = document.getElementById('registerForm');

  form.addEventListener('submit', function(event) {
  event.preventDefault();
  const formData = new FormData(form);

  const username = formData.get('name');
  mail = formData.get('mail');
  pwd = formData.get('password');

  window.localStorage.setItem("mail", mail);
  window.localStorage.setItem("pwd", pwd);
  window.localStorage.setItem("username", username);
  
  window.location.href = `login.html?user=${username}`;

  });
}

function loginform(){
  getUserName();
  getCartCount();
  showLogout();
   form = document.getElementById('loginForm');
 
   form.addEventListener('submit', function(event) {
   event.preventDefault();
   const formData = new FormData(form);
 
   const loginmail = formData.get('mail');
   const loginpwd = formData.get('password');
 
   const urlParams = new URLSearchParams(window.location.search);
   const userdata = urlParams.get('user');

   if((loginmail == window.localStorage.getItem('mail')) && (loginpwd == window.localStorage.getItem('pwd'))) {
     window.localStorage.setItem("isLoggedIn", true);
     window.location.href = "index.html?username="+userdata;
   } else {
    document.getElementById("message").innerHTML = "! Mail or Password is wrong. Enter correct Details (Or)</br> Register First before Login";
   }
   
  });
}

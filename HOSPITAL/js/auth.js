const DEMO_USER="patient", DEMO_PASSWORD="medcare123";
function login(){
 const u=document.getElementById("username").value,p=document.getElementById("password").value,m=document.getElementById("message");
 if(u===DEMO_USER&&p===DEMO_PASSWORD){localStorage.setItem("medcareUser",u);m.textContent="Login successful!";setTimeout(()=>location.href="index.html",600)}
 else m.textContent="Incorrect username or password.";
}
function register(){
 const u=document.getElementById("username").value.trim(),p=document.getElementById("password").value;
 document.getElementById("message").textContent=u&&p?"Demo registration complete. Use patient / medcare123 to log in.":"Enter a username and password.";
}

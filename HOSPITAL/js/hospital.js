const USER="hospital",PASS="hospital123";
function hospitalLogin(){
 const u=document.getElementById("username").value,p=document.getElementById("password").value;
 if(u===USER&&p===PASS){document.getElementById("message").textContent="Hospital login successful.";document.getElementById("hospitalPanel").hidden=false;loadHospital()}
 else document.getElementById("message").textContent="Incorrect hospital username or password.";
}
function loadHospital(){
 const d=JSON.parse(localStorage.getItem("medcareHospital")||"null");if(d){hospitalName.value=d.name;hospitalLocation.value=d.location;hospitalAddress.value=d.address}updateMap();
}
function saveHospital(){
 const d={name:hospitalName.value,location:hospitalLocation.value,address:hospitalAddress.value};localStorage.setItem("medcareHospital",JSON.stringify(d));updateMap();document.getElementById("saveMessage").textContent="Hospital details saved.";
}
function updateMap(){mapLink.href="https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(hospitalAddress.value+" "+hospitalLocation.value)}

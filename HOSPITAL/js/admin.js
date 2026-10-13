const ADMIN_USER="admin",ADMIN_PASS="admin123";
const defaults=[{id:1,name:"Dr. Ananya Rao",specialty:"Cardiology",hospital:"MedCare Hospital",location:"Chennai"},{id:2,name:"Dr. Karthik Kumar",specialty:"Dermatology",hospital:"City Care Clinic",location:"Sriperumbudur"},{id:3,name:"Dr. Meera Shah",specialty:"Pediatrics",hospital:"MedCare Hospital",location:"Chennai"},{id:4,name:"Dr. Arun Prakash",specialty:"Orthopedics",hospital:"Green Life Hospital",location:"Kanchipuram"},{id:5,name:"Dr. Divya Nair",specialty:"General Medicine",hospital:"City Care Clinic",location:"Sriperumbudur"}];
const read=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},save=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
function adminLogin(){
 if(document.getElementById("username").value===ADMIN_USER&&document.getElementById("password").value===ADMIN_PASS){document.getElementById("message").textContent="Admin login successful.";document.getElementById("admin").hidden=false;showAdminAppointments()}
 else document.getElementById("message").textContent="Incorrect admin username or password.";
}
function showAdminAppointments(){
 const list=read("medcareAppointments",[]),reviews=read("medcareReviews",[]);
 document.getElementById("stats").textContent=`Total appointments: ${list.length} | Booked: ${list.filter(a=>a.status==="Booked").length} | Cancelled: ${list.filter(a=>a.status==="Cancelled").length} | Reviews: ${reviews.length}`;
 document.getElementById("appointments").innerHTML=list.map(a=>`<div class="appointment"><b>#${a.id} — ${a.patient}</b><p>${a.doctor} (${a.specialty}) | ${a.date} ${a.time}</p><p>${a.hospital}, ${a.location} | Check-in: ${a.checkin}</p><p>Status: ${a.status}</p><button onclick="setStatus('${a.id}','Confirmed')">Confirm</button><button onclick="setStatus('${a.id}','Completed')">Complete</button><button onclick="setStatus('${a.id}','Cancelled')">Cancel</button></div>`).join("")||"No appointments yet.";
}
function setStatus(id,status){const list=read("medcareAppointments",[]),a=list.find(x=>x.id===id);if(a)a.status=status;save("medcareAppointments",list);showAdminAppointments()}
function addDoctor(){
 const name=document.getElementById("newDoctor").value.trim(),specialty=document.getElementById("newSpecialty").value.trim(),hospital=document.getElementById("newHospital").value.trim(),location=document.getElementById("newLocation").value.trim();
 if(!name||!specialty||!hospital||!location){document.getElementById("doctorMessage").textContent="Fill in all doctor details.";return}
 const list=read("medcareDoctors",defaults);list.push({id:Date.now(),name,specialty,hospital,location});save("medcareDoctors",list);document.getElementById("doctorMessage").textContent="Doctor added. Refresh the home page to see the new doctor.";
}

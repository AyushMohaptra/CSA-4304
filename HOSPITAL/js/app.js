const defaultDoctors = [
  {id:1,name:"Dr. Ananya Rao",specialty:"Cardiology",hospital:"MedCare Hospital",location:"Chennai"},
  {id:2,name:"Dr. Karthik Kumar",specialty:"Dermatology",hospital:"City Care Clinic",location:"Sriperumbudur"},
  {id:3,name:"Dr. Meera Shah",specialty:"Pediatrics",hospital:"MedCare Hospital",location:"Chennai"},
  {id:4,name:"Dr. Arun Prakash",specialty:"Orthopedics",hospital:"Green Life Hospital",location:"Kanchipuram"},
  {id:5,name:"Dr. Divya Nair",specialty:"General Medicine",hospital:"City Care Clinic",location:"Sriperumbudur"}
];
const read=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}};
const save=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
function doctors(){return read("medcareDoctors",defaultDoctors)}
function showDoctors(){
 const q=document.getElementById("search").value.toLowerCase(),sp=document.getElementById("specialty").value,loc=document.getElementById("location").value;
 const list=doctors().filter(d=>(d.name+" "+d.specialty+" "+d.hospital+" "+d.location).toLowerCase().includes(q)&&(sp==="All"||d.specialty===sp)&&(loc==="All"||d.location===loc));
 document.getElementById("doctors").innerHTML=list.map(d=>`<div class="doctor"><b>${d.name}</b><p>${d.specialty} — ${d.hospital}, ${d.location}</p><a target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(d.hospital+' '+d.location)}">View hospital on Google Maps</a></div>`).join("")||"No doctors found.";
 const options=doctors().map(d=>`<option value="${d.id}">${d.name} (${d.specialty})</option>`).join("");
 document.getElementById("doctor").innerHTML=options;document.getElementById("reviewDoctor").innerHTML=options;
}
function bookAppointment(){
 const patient=document.getElementById("patient").value.trim(),doctorId=Number(document.getElementById("doctor").value),date=document.getElementById("date").value,time=document.getElementById("time").value;
 const msg=document.getElementById("message");if(!patient||!date){msg.textContent="Enter patient name and appointment date.";return}
 if(date<new Date().toISOString().slice(0,10)){msg.textContent="Choose today or a future date.";return}
 const list=read("medcareAppointments",[]),doctor=doctors().find(d=>d.id===doctorId);
 if(list.some(a=>a.doctorId===doctorId&&a.date===date&&a.time===time&&a.status!=="Cancelled")){msg.textContent="This doctor is already booked for that time.";return}
 const id=Date.now().toString().slice(-7);list.push({id,patient,doctorId,doctor:doctor.name,specialty:doctor.specialty,hospital:doctor.hospital,location:doctor.location,date,time,status:"Booked",checkin:"Not submitted"});
 save("medcareAppointments",list);msg.textContent="Appointment booked. Your appointment ID is "+id;showAppointments();
}
function showAppointments(){
 const list=read("medcareAppointments",[]);
 document.getElementById("myAppointments").innerHTML=list.map(a=>`<div class="appointment"><b>Appointment #${a.id}</b><p>${a.patient} — ${a.doctor} (${a.specialty})</p><p>${a.hospital}, ${a.location} | ${a.date} at ${a.time}</p><p>Status: <span class="status">${a.status}</span> | Check-in: ${a.checkin}</p>${a.status!=="Cancelled"?`<button onclick="cancelAppointment('${a.id}')">Cancel</button>`:""}</div>`).join("")||"No appointments yet.";
}
function cancelAppointment(id){const list=read("medcareAppointments",[]),a=list.find(x=>x.id===id);if(a)a.status="Cancelled";save("medcareAppointments",list);showAppointments()}
function checkIn(){
 const id=document.getElementById("checkinId").value.trim(),reason=document.getElementById("reason").value.trim(),list=read("medcareAppointments",[]),a=list.find(x=>x.id===id);
 if(!a){document.getElementById("checkinMessage").textContent="Appointment ID not found.";return}
 a.checkin=reason||"Checked in";save("medcareAppointments",list);document.getElementById("checkinMessage").textContent="Check-in form submitted.";showAppointments();
}
function submitReview(){
 const id=Number(document.getElementById("reviewDoctor").value),rating=document.getElementById("rating").value,text=document.getElementById("reviewText").value.trim();
 if(!text){document.getElementById("reviewMessage").textContent="Write a review first.";return}
 const list=read("medcareReviews",[]);list.push({doctorId:id,rating,text});save("medcareReviews",list);document.getElementById("reviewMessage").textContent="Thank you for your feedback.";document.getElementById("reviewText").value="";
}
showDoctors();showAppointments();

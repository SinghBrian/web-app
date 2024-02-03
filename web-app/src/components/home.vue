


<!-- custom js file link  -->
<!--<script src="js/script.js"></script>-->
<script>
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/vue';

export default{
   
   data(){
      return{
         Hotels:{
            Criteria_stars :"0",
            Criteria_size:"0",
            destination:"0"
         },
         Client:{
            Name:"",
            Password:"",
            Email:"",
            Numero:""
         },
         Reservation :{
            DateDeb:"",
            DateFin:"",
            Adults:"",
            Child:"0",
            Hotel:"",
            Categorie:"",
            services:"0"
         },
         reservations:[],
         messageClient:[],
         message:""
      }
   },
   methods:{
       GetHotels(){
         console.log(this.Hotels);
         var size = this.Hotels.Criteria_size;
         var stars = this.Hotels.Criteria_stars;
         var destination = this.Hotels.destination;
         if(this.Hotels.Criteria_size == "" && this.Hotels.Criteria_stars=="" && this.Hotels.destination=="" ){
            var size = "0";
         var stars = "0";
         var destination = "0";
         }
          axios.get('https:localhost:7161/api/Clients/GetHotelByCriteria/'+size+"/"+stars+"/"+destination)
         .then(response =>{
            this.Hotels = response.data;
                        console.log(response.data);
                    })
         .catch(error => {
                    if(error.response){
                        alert(error.response.data);
                       console.log("marche pas");
                    }
                });
      },
      togglePopup() {
      document.getElementById("test").style.display="flex";
},
togglePopupOff() {
      document.getElementById("test").style.display="none";
      document.getElementById("acc").style.display="none";
},
Login(){
   console.log(this.Client)
   var names = this.Client.Name;
   var pswd = this.Client.Password;
   var mail = this.Client.Email;
   var num = this.Client.Numero;

   axios.get('https:localhost:7161/api/Clients/GetClientLogin/'+names+'/'+pswd+'/'+mail+'/'+num)
      .then(response=>{
         if(response.data == true){
            alert("connecté")
            console.log("connecté");
          
            this.togglePopupOff();
            
         }
         
      })
      .catch(error => {
                    if(error.response){
                     alert("Client pas trouvé !");
                       console.log("marche pas");
                    }
                });

},
Signup(){
   console.log(this.Client)
   var names = this.Client.Name;
   var pswd = this.Client.Password;
   var mail = this.Client.Email;
   var num = this.Client.Numero;
   if(names == "" || pswd =="" || mail =="" || num == ""){
      alert("Veuillez remplir tous les champs requis !");
   }
   else{

   axios.post('https:localhost:7161/api/Clients/PostClientLogin/'+names+'/'+pswd+'/'+mail+'/'+num)
      .then(response=>{
         if(response.data == true){
            console.log("client ajouté")
            this.togglePopupOff();
            
         }
         
      })
      .catch(error => {
                    if(error.response){
                     alert(error.response.data);
                       
                    }
                });
   }

},
PostReservation(){
   var datedeb = this.Reservation.DateDeb;
   var datefin =  this.Reservation.DateFin;
   var Adult = this.Reservation.Adults;
   var childs = this.Reservation.Child;
   var cat = this.Reservation.Categorie;
   var hot = this.Reservation.Hotel;
   var client = this.Client.Name;
   var servSupp = this.Reservation.services;
   var currentDate = new Date();
   var selectedDate = new Date(datedeb);
   if(selectedDate.getDate()< currentDate.getDate()){
      alert("Veuillez prendre la date d'aujourd'hui");
   }
   if(this.Client.Name ==""){
      alert("Veuillez vous connecter pour faire une réservation.");
   }
   else if(selectedDate.getDate()>= currentDate.getDate()){
   axios.post('https:localhost:7161/api/Clients/PostReservation/'+ datedeb + '/'+ datefin + '/' + Adult+'/'+ childs + '/' + hot+ '/' + cat + '/' +client+'/'+servSupp)
   .then(response=>{
         console.log(response.data);
         alert("Réservation effectué.");
         
      })
      .catch(error => {
                    if(error.response){
                        alert("Veuillez remplir tous les champs !");
                       console.log("marche pas");
                    }
                });

}},
GetReservations(){
   var name = this.Client.Name;
   axios.get('https:localhost:7161/api/Clients/GetFullReservation/'+name)
   .then(response=>{
      this.reservations=response.data;
      console.log(this.reservations);
   })
   .catch(error => {
                    if(error.response){
                       console.log("marche pas");
                    }
                });
},
MyAccount(){
   if(this.Client.Name==""){
      this.togglePopup();
   
   }
   else if(this.Client.Name != ""){
      document.getElementById("acc").style.display="flex";
      
   }
},
CheckSpace(){
   const dropdown = document.getElementById("rms");
   var totchild = parseInt(this.Reservation.Child);
   var totalCli = parseInt(this.Reservation.Adults) + totchild;
   
   console.log(totalCli);
   if(totalCli ==1){
      const optionToHide1 = dropdown.querySelector("option[value='Single']");
      const optionToHide2 = dropdown.querySelector("option[value='Double']");
      const optionToHide3 = dropdown.querySelector("option[value='Suite']");
      const optionToHide4 = dropdown.querySelector("option[value='Presidential Suite']");


      optionToHide1.style.display = "block";
      optionToHide2.style.display = "block";
      optionToHide3.style.display = "block";
      optionToHide4.style.display = "block";
   }else if (totalCli == 2){
      const optionToHide1 = dropdown.querySelector("option[value='Single']");
      const optionToHide2 = dropdown.querySelector("option[value='Double']");
      const optionToHide3 = dropdown.querySelector("option[value='Suite']");
      const optionToHide4 = dropdown.querySelector("option[value='Presidential Suite']");


      optionToHide1.style.display = "none";
      optionToHide2.style.display = "block";
      optionToHide3.style.display = "block";
      optionToHide4.style.display = "block";
   }else if (totalCli == 3){
      const optionToHide1 = dropdown.querySelector("option[value='Single']");
      const optionToHide2 = dropdown.querySelector("option[value='Double']");
      const optionToHide3 = dropdown.querySelector("option[value='Suite']");
      const optionToHide4 = dropdown.querySelector("option[value='Presidential Suite']");


      optionToHide1.style.display = "none";
      optionToHide2.style.display = "none";
      optionToHide3.style.display = "block";
      optionToHide4.style.display = "block";
   }else if (totalCli == 4){
      const optionToHide1 = dropdown.querySelector("option[value='Single']");
      const optionToHide2 = dropdown.querySelector("option[value='Double']");
      const optionToHide3 = dropdown.querySelector("option[value='Suite']");
      const optionToHide4 = dropdown.querySelector("option[value='Presidential Suite']");


      optionToHide1.style.display = "none";
      optionToHide2.style.display = "none";
      optionToHide3.style.display = "block";
      optionToHide4.style.display = "block";
   }else if (totalCli > 4){
      const optionToHide1 = dropdown.querySelector("option[value='Single']");
      const optionToHide2 = dropdown.querySelector("option[value='Double']");
      const optionToHide3 = dropdown.querySelector("option[value='Suite']");
      const optionToHide4 = dropdown.querySelector("option[value='Presidential Suite']");


      optionToHide1.style.display = "none";
      optionToHide2.style.display = "none";
      optionToHide3.style.display = "none";
      optionToHide4.style.display = "block";

   }
      
   
},
sendMessage(){
   if(this.Client.Name ==""){
      this.togglePopup();
      alert("Veuillez vous connecter pour envoyer un message.");
   }
   var client = this.Client.Name;
   var msg = this.message;
   axios.post('https:localhost:7161/api/Clients/ClientToComm/'+client +'/'+msg)
   .then(response=>{
      console.log(this.message);
      alert("Message envoyé");
   })
   .catch(error => {
                    if(error.response){
                       console.log("marche pas");
                    }
                });
},
updateClient(){
   var clientN =this.Client.Name;
   var pswdd = document.getElementById("PSWD").value;
   var num = document.getElementById("Tel").value;
   var email =document.getElementById("Mail").value;
   axios.put('https:localhost:7161/api/Clients/modifyClient/'+clientN+'/'+pswdd+'/'+num+'/'+email)
   .then(response=>{
      console.log(response.data);
      alert("Changement effectué");
   })
   .catch(error => {
                    if(error.response){
                       console.log("marche pas");
                    }
                });
}


   }
}
window.onload = function(){
let navbar = document.querySelector('.header .navbar');


document.querySelector('menu-btn2').onclick= function() {
   navbar.classList.toggle('active');
}

window.onscroll = () =>{
   navbar.classList.remove('active');
}

document.querySelectorAll('.contact .row .faq .box h3').forEach(faqBox => {
   faqBox.onclick = () =>{
      faqBox.parentElement.classList.toggle('active');
   }
});


}


</script>

<template>
<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>complete responsive hotel booking </title>

</head>
<body>
   
<!-- header section starts  -->

<button class="btn" @click="togglePopup()">Login</button>
<button class="btn" @click="MyAccount()">MyAccount</button>
<div>
   <br>
   <p style="font-size: 3rem">{{ Client.Name }}</p>
   
</div>
<section class="header">

   <div class="flex">
      <a href="#home" class="logo">Hotels And Resorts</a>
      
      <div id="menu-btn2" class="fas fa-bars"></div>
   </div>
   

   <nav class="navbar">
      <a href="#home">home</a>
      <a href="#about">about</a>
      <a href="#reservation">Prices</a>
      <a href="#gallery">gallery</a>
      <a href="#contact">contact</a>
      <a href="#reviews">reviews</a>
      
   </nav>

</section>

<!-- header section ends -->

<!-- home section starts  -->

<section class="home" id="home">
 
   <div class="swiper home-slider">
      
      <div class="swiper-wrapper">
         
         <div class="box swiper-slide">
             
            <img src="/images/images/home-img-1.jpg" alt="">
         
            <div class="flex">
               <h3>luxurious rooms</h3>
               <a href="#availability" class="btn">check availability</a>
            </div>
         </div>
      
         <div class="box swiper-slide">
            <img src="/images/images/home-img-2.jpg" alt="">
            <div class="flex">
               <h3>foods and drinks</h3>
               <a href="#reservation" class="btn">Check Prices</a>
            </div>
         </div>

         <div class="box swiper-slide">
            <img src="/images/images/home-img-3.jpg" alt="">
            <div class="flex">
               <h3>luxurious halls</h3>
               <a href="#contact" class="btn">contact us</a>
            </div>
         </div>

      </div>

   </div>
   
   
</section>

<!-- home section ends -->
<div class="popup" id="test">
      <div class="popup-content">
         
         <input class="input" type="text" v-model="Client.Name" placeholder="Name">
         <input class="input" type="text"  v-model="Client.Password" placeholder="Password">
         <input class="input" type="text" v-model="Client.Numero" placeholder="Telephone Number">
         <input class="input" type="text" v-model="Client.Email" placeholder="Email">
         <button href="#" class="btn" @click="Login()">Login</button>
         <button href="#" class="btn" @click="Signup()">Signup</button>
         <button href="#" class="btn" @click="togglePopupOff()">Close</button>

      </div>

   </div>

   <div class="MyAccount" id="acc">
      <div class="MyAccount-content">
         <p style="font-size: 3rem;color:var(--main-color);">{{ Client.Name }}</p>
         <button href="#" class="btn" @click="GetReservations()">Reservations</button>
         <table class="box">
        <thead>
            <tr>
                <th>Reservation Number</th>
                <th>Total</th>
                <th>Date of Reservation</th>
                <th>Client Name</th>
            </tr>
        </thead>
        <tbody v-for="res in reservations" :key="res.reservationId">
         <td>{{ res.reservationId }}</td>
         <td>{{ res.total }}</td>
         <td>{{ res.reservationDate }}</td>
         <td>{{ res.clientName }}</td>
         </tbody>
      
         </table>
         <button href="#" class="btn" @click="togglePopupOff()">Close</button><br><br>
         <label for="PSWD" class="label">Password:</label>
         <input type="text" id="PSWD" v-model="Client.Password"><br>
         <label for="Tel" class="label">Tél:</label>
         <input type="text" id="Tel" v-model="Client.Numero"><br>
         <label for="Mail" class="label">Mail:</label>
         <input type="text" id="Mail" v-model="Client.Email"><br><br>
         <button class="btn" @click="updateClient()">submit</button>

      </div>

   </div>
<!-- availability section starts  -->

<section class="availability" id="availability">

   
      <div class="flexi">
         <div class="box">
            <p>check in <span>*</span></p>
            <input type="date" v-model="Reservation.DateDeb" name="check_in" class="input" required>
         </div>
         <div class="box">
            <p>check out <span>*</span></p>
            <input type="date" v-model="Reservation.DateFin" name="check_out" class="input" required>
         </div>
         <div class="box">
            <p>adults <span>*</span></p>
            <select name="adults" v-model="Reservation.Adults" :onChange="CheckSpace()" class="input" required>
               <option value="1">1 adult</option>
               <option value="2">2 adults</option>
               <option value="3">3 adults</option>
               <option value="4">4 adults</option>
               <option value="5">5 adults</option>
               <option value="6">6 adults</option>
            </select>
         </div>
         <div class="box">
            <p>childs <span>*</span></p>
            <select name="childs" v-model="Reservation.Child" class="input" required>
               <option value="0">0 child</option>
               <option value="1">1 child</option>
               <option value="2">2 childs</option>
               <option value="3">3 childs</option>
               <option value="4">4 childs</option>
               <option value="5">5 childs</option>
               <option value="6">6 childs</option>
            </select>
         </div>
         <div class="box">
            <p>Hotels <span>*</span></p>
            <select name="hotels" v-model="Reservation.Hotel" class="input" required>
               <option value="Thevy">Thevy</option>
               <option value="Unana">Unana</option>
               <option value="Devialet">Devialet</option>
            </select>
         </div>
         <div class="box">
            <p>rooms <span>*</span></p>
            <select name="rooms" id="rms" v-model="Reservation.Categorie" class="input" required>
               <option value="Single">Single</option>
               <option value="Double">Double</option>
               <option value="Suite">Suite</option>
               <option value="Presidential Suite">Presidential Suite</option>
            </select>
         </div>
         <div class="box">
            <p>Supplementary Services <span>*</span></p>
            <select name="services" v-model="Reservation.services" class="input" required>
               <option value="100">Sauna - 100</option>
               <option value="300">Massage - 300</option>
               <option value="25">Breakfast - 25</option>
               <option value="150">Gym - 150</option>
            </select>
         </div>
      </div>
      <button class="btn" @click="PostReservation()">Make Reservation</button>
   
   
      <div class="flexi">

         <div class="box">
            <p>Number of Stars <span>*</span></p>
            <select v-model="Hotels.Criteria_stars" @change="Criteria_stars" name="stars" class="input" required>
               <option value="0">all</option>
               <option value="3 stars">3 étoiles</option>
               <option value="4 stars">4 étoiles</option>
               <option value="5 stars">5 étoiles</option>
               <option value="6 stars">6 étoiles</option>
            </select>
         </div>
         <div class="box">
            <p>Size <span>*</span></p>
            <select v-model="Hotels.Criteria_size" @change="Criteria_size" name="size" class="input" required>
               <option value="0">all</option>
               <option value="Small">Small</option>
               <option value="Medium">Medium</option>
               <option value="Big">Big</option>
            </select>
         </div>
         <div class="box">
            <p>Destination <span>*</span></p>
            <select v-model="Hotels.destination" @change="destination" name="Destination" class="input" required>
               <option value="0">all</option>
               <option value="Thailand">Thailand</option>
               <option value="France">France</option>
               <option value="Africa">Africa</option>
            </select>
         </div>
         
      </div>
      <button class="btn" @click="GetHotels">Check Hotels</button>
   
   <form action="" method="post">
      <div class="flex">
         <table class="box">
        <thead>
            <tr>
                <th>Hotel Name</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody v-for="hot in Hotels" :key="hot.HotelsId">
         <td>{{ hot.name }}</td>
         <td>{{ hot.description }}</td>
         <td></td>
         </tbody>
      
         </table>
      </div>
      
   </form>
   
</section>

<!-- availability section ends -->

<!-- about section starts  -->

<section class="about" id="about">

   <div class="row">
      <div class="image">
         <img src="/images/images/about-img-1.jpg" alt="">
      </div>
      <div class="content">
         <h3>best staff</h3>
         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi laborum maxime eius aliquid temporibus unde?</p>
         <a href="#reservation" class="btn">Check Prices</a>
      </div>
   </div>

   <div class="row revers">
      <div class="image">
         <img src="/images/images/about-img-2.jpg" alt="">
      </div>
      <div class="content">
         <h3>best foods</h3>
         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi laborum maxime eius aliquid temporibus unde?</p>
         <a href="#contact" class="btn">contact us</a>
      </div>
   </div>

   <div class="row">
      <div class="image">
         <img src="/images/images/about-img-3.jpg" alt="">
      </div>
      <div class="content">
         <h3>swimming pool</h3>
         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi laborum maxime eius aliquid temporibus unde?</p>
         <a href="#availability" class="btn">check availability</a>
      </div>
   </div>

</section>

<!-- about section ends -->

<!-- services section starts  -->

<section class="services">

   <div class="box-container">

      <div class="box">
         <img src="/images/images/icon-1.png" alt="">
         <h3>food & drinks</h3>
         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, sunt?</p>
      </div>

      <div class="box">
         <img src="/images/images/icon-2.png" alt="">
         <h3>outdoor dining</h3>
         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, sunt?</p>
      </div>

      <div class="box">
         <img src="/images/images/icon-3.png" alt="">
         <h3>beach view</h3>
         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, sunt?</p>
      </div>

      <div class="box">
         <img src="/images/images/icon-4.png" alt="">
         <h3>decorations</h3>
         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, sunt?</p>
      </div>

      <div class="box">
         <img src="/images/images/icon-5.png" alt="">
         <h3>swimming pool</h3>
         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, sunt?</p>
      </div>

      <div class="box">
         <img src="/images/images/icon-6.png" alt="">
         <h3>resort beach</h3>
         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, sunt?</p>
      </div>

   </div>

</section>

<!-- services section ends -->

<!-- reservation section starts  -->

<section class="reservation" id="reservation">

   <form action="" method="post">
      <h3>Rooms prices and variations</h3>
      <div class="flex">
         <table class="box">
            <thead>
               <tr>
                  <th><h3>Room Sizes</h3></th>
                  <th><h3>Capacity</h3></th>
                  <th><h3>Prices (low-standard-high)</h3></th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td>Single</td>
                  <td>1</td>
                  <td>60-80-100</td>
               </tr>
               <tr>
                  <td>Double</td>
                  <td>2</td>
                  <td>110-130-170</td>
               </tr>
               <tr>
                  <td>Suite</td>
                  <td>4</td>
                  <td>340-360-400</td>
               </tr>
               <tr>
                  <td>Suite Presidential</td>
                  <td>8</td>
                  <td>760-780-800</td>
               </tr>
               
            </tbody>

         </table>
      </div>
      
   </form>

</section>

<!-- reservation section ends -->

<!-- gallery section starts  -->

<section class="gallery" id="gallery">

   <div class="swiper gallery-slider">
      <div class="swiper-wrapper">
         <img src="/images/images/gallery-img-1.jpg" class="swiper-slide" alt="">
         <img src="/images/images/gallery-img-2.webp" class="swiper-slide" alt="">
         <img src="/images/images/gallery-img-3.webp" class="swiper-slide" alt="">
         <img src="/images/images/gallery-img-4.webp" class="swiper-slide" alt="">
         <img src="/images/images/gallery-img-5.webp" class="swiper-slide" alt="">
         <img src="/images/images/gallery-img-6.webp" class="swiper-slide" alt="">
      </div>
      <div class="swiper-pagination"></div>
   </div>

</section>

<!-- gallery section ends -->

<!-- contact section starts  -->

<section class="contact" id="contact">
   
   <div class="row">
      
      <div class="flexi">
         <div class="box">
            <h3>Send us a Message</h3>
            <label for="message" >message:</label>
            <textarea id="message" name="message" class="input" v-model="message"></textarea>
         </div>
         <button class="btn" @click="sendMessage()">send Message</button>
      </div>
   
      <div class="faq">
         <h3 class="title">frequently asked questions</h3>
         <div class="box active">
            <h3>how to cancel?</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus sunt aspernatur excepturi eos! Quibusdam, sapiente.</p>
         </div>
         <div class="box">
            <h3>is there any vacancy?</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa ipsam neque quaerat mollitia ratione? Soluta!</p>
         </div>
         <div class="box">
            <h3>what are payment methods?</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa ipsam neque quaerat mollitia ratione? Soluta!</p>
         </div>
         <div class="box">
            <h3>how to claim coupons codes?</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa ipsam neque quaerat mollitia ratione? Soluta!</p>
         </div>
         <div class="box">
            <h3>what are the age requirements?</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa ipsam neque quaerat mollitia ratione? Soluta!</p>
         </div>
      </div>

   </div>

</section>

<!-- contact section ends -->

<!-- reviews section starts  -->

<section class="reviews" id="reviews">
    <swiper>
    <swiper-slide>
   <div class="swiper reviews-slider">

      <div class="swiper-wrapper">
         <div class="swiper-slide box">
            <img src="/images/images/pic-1.png" alt="">
            <h3>john deo</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates blanditiis optio dignissimos eaque aliquid explicabo.</p>
         </div>
         <div class="swiper-slide box">
            <img src="/images/images/pic-2.png" alt="">
            <h3>john deo</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates blanditiis optio dignissimos eaque aliquid explicabo.</p>
         </div>
         <div class="swiper-slide box">
            <img src="/images/images/pic-3.png" alt="">
            <h3>john deo</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates blanditiis optio dignissimos eaque aliquid explicabo.</p>
         </div>
         <div class="swiper-slide box">
            <img src="/images/images/pic-4.png" alt="">
            <h3>john deo</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates blanditiis optio dignissimos eaque aliquid explicabo.</p>
         </div>
         <div class="swiper-slide box">
            <img src="/images/images/pic-5.png" alt="">
            <h3>john deo</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates blanditiis optio dignissimos eaque aliquid explicabo.</p>
         </div>
         <div class="swiper-slide box">
            <img src="/images/images/pic-6.png" alt="">
            <h3>john deo</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates blanditiis optio dignissimos eaque aliquid explicabo.</p>
         </div>
      </div>

      <div class="swiper-pagination"></div>
   </div>
    </swiper-slide>
   </swiper>

</section>

<!-- reviews section ends  -->

<!-- footer section starts  -->

<section class="footer">

   <div class="box-container">

      <div class="box">
         <a href="tel:1234567890"><i class="fas fa-phone"></i> +32-456-7890</a>
         <a href="tel:1112223333"><i class="fas fa-phone"></i> +32-222-3333</a>
         <a href="mailto:shakhanas@gmail.com"><i class="fas fa-envelope"></i> singhBrian@gmail.com</a>
         <a href="#"><i class="fas fa-map-marker-alt"></i> Bruxelles, Belgique - 1000</a>
      </div>

      <div class="box">
         <a href="#home">home</a>
         <a href="#about">about</a>
         <a href="#reservation">Prices</a>
         <a href="#gallery">gallery</a>
         <a href="#contact">contact</a>
         <a href="#reviews">reviews</a>
      </div>

      <div class="box">
         <a href="#">facebook <i class="fab fa-facebook-f"></i></a>
         <a href="#">twitter <i class="fab fa-twitter"></i></a>
         <a href="#">instagram <i class="fab fa-instagram"></i></a>
         <a href="#">linkedin <i class="fab fa-linkedin"></i></a>
      </div>

   </div>

   <div class="credit">&copy; copyright @ 2024 by mr.Singh Brian | all rights reseved!</div>

</section>

<!-- footer section ends -->
</body>
</html>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400&display=swap');

:root{
   --main-color:#2B1103;
   --sub-color:#DCC69C;
   --white:#fff;
   --border:.1rem solid rgba(220, 198, 156, .3);
}

*{
   font-family: 'Montserrat', sans-serif;
   margin: 0; padding: 0;
   box-sizing: border-box;
   outline: none; border: none;
   text-decoration: none;
}

*::selection{
   background-color: var(--sub-color);
   color: var(--main-color);
}

*::-webkit-scrollbar{
   height: .5rem;
   width: 1rem;
}

*::-webkit-scrollbar-track{
   background-color: transparent;
}

*::-webkit-scrollbar-thumb{
   background-color: var(--sub-color);
   border-radius: 5rem;
}

html{
   font-size: 62.5%;
   overflow-x: hidden;
   scroll-behavior: smooth;
   scroll-padding-top: 2rem;
}

body{
   background-color: var(--main-color);
   
}

section{
   padding: 3rem 2rem;
   max-width: 2000px;
   margin: 0;
}

.btn{
   display: inline-block;
   cursor: pointer;
   padding: 1rem 3rem;
   border: var(--border);
   font-size: 1.8rem;
   color: var(--sub-color);
   text-align: center;
   text-transform: capitalize;
   transition: .2s linear;
   margin-top: 1rem;
   background-color: var(--main-color);
}

.btn:hover{
   border-radius: 5rem;
   background-color: var(--sub-color);
   color: var(--main-color);
}

.header{
   padding-bottom: 0;
}

.header .flex{
   display: flex;
   align-items: center;
   justify-content: space-between;
   gap: 1.5rem;
}

.header .flex .logo{
   color: var(--sub-color);
   font-size: 2.5rem;
}

.header .flex .btn{
   margin-top: 0;
}

.header .flex .fa-bars{
   font-size: 3rem;
   cursor: pointer;
   color: var(--sub-color);
   display: none;
}

.header .navbar{
   display: flex;
   align-items: center;
   justify-content: space-evenly;
   gap: 1.5rem;
   margin-top: 2rem;
   background-color: var(--sub-color);
   padding: .5rem;
   border-radius: .5rem;
}

.header .navbar a{
   font-size: 1.8rem;
   color: var(--main-color);
   padding: 1rem 3rem;
   border-radius: .5rem;
}

.header .navbar a:hover{
   background-color: var(--main-color);
   color: var(--sub-color);
}

.home .box img{
   border-radius: .5rem;
   height: 60vh;
   width: 100%;
   object-fit: cover;
}

.home .box .flex{
   display: flex;
   align-items: center;
   justify-content: space-between;
   gap: 1.5rem;
   flex-wrap: wrap;
   margin-top: 1.5rem;
}

.home .box .flex h3{
   font-size: 2.5rem;
   color: var(--sub-color);
   text-transform: capitalize;
}
.MyAccount{
   background: rgba(0, 0, 0, 0.6);
   width: 100%;
   height: 100%;
   position: absolute;
   top: 0;
   display: none;
   justify-content: center;
   align-items: center;
   text-align: center;
}
.MyAccount-content{
   height: 600px;
   width: 700px;
   background: var(--sub-color);
   padding: 20px;
   border-radius: 20px;
   position: relative;
   overflow: auto;
}
.MyAccount-content .label{
   color: var(--main-color);
   align-items: center;
}
.MyAccount .box{
   flex: 1 1 20rem;
   font-size: 2rem;
   color: var(--main-color);
   margin-left: auto;
  margin-right: auto;
  width: 100%;
}
.popup{
   background: rgba(0, 0, 0, 0.6);
   width: 100%;
   height: 100%;
   position: absolute;
   top: 0;
   display: none;
   justify-content: center;
   align-items: center;
   text-align: center;
}
.popup-content{
   height: 200px;
   width: 500px;
   background: var(--sub-color);
   padding: 20px;
   border-radius: 20px;
   position: relative;
   
}
.popup .popup-content .input{
   margin: 2px auto;
   display: block;
   width: 50%;
   padding: 2px;
   border: 1px solid gray;
   background-color: var(--main-color);
   color: var(--white);
  
}
.swiper-button-prev{
   left: 0%;
}

.swiper-button-next{
   right: 0;
}

.swiper-button-next,
.swiper-button-prev{
   padding: 3rem 2rem;
   background-color: var(--white);
   top: 40%;
   opacity: .7;
}

.swiper-button-next::after,
.swiper-button-prev::after{
   color: var(--main-color);
   font-size: 2rem;
}

.swiper-button-next:hover,
.swiper-button-prev:hover{
   opacity: 1;
}

.availability form .flex{
   display: flex;
   flex-wrap: wrap;
   gap: 1.5rem;
}

.availability form .flex .box{
   flex: 1 1 20rem;
   font-size: 2rem;
   color: var(--sub-color);
}
.availability .flexi {
   display: flex;
   flex-wrap: wrap;
   gap: 1.5rem;
   
}
.availability .flexi .box{
   flex: 1 1 20rem;
   font-size: 2rem;
   color: var(--sub-color);
   
}
.availability .flexi .box p{
   font-size: 2rem;
   color: var(--sub-color);
}
.availability .flexi .box .input{
   width: 100%;
   padding: 1rem 0;
   font-size: 1.8rem;
   background-color: var(--main-color);
   color: var(--white);
   border-bottom: var(--border);
   margin: 1rem 0;
}
.availability form .flex .box p{
   font-size: 2rem;
   color: var(--sub-color);
}
.availability form .flex .box .input{
   width: 100%;
   padding: 1rem 0;
   font-size: 1.8rem;
   background-color: var(--main-color);
   color: var(--white);
   border-bottom: var(--border);
   margin: 1rem 0;
}

.availability form .flex .box input[type="date"]::-webkit-calendar-picker-indicator{
   filter: invert(1);
}

.about .row{
   display: flex;
   flex-wrap: wrap;
   gap: 1.5rem;
   text-align: center;
   align-items: center;
}

.about .row .image{
   flex: 1 1 40rem;
}

.about .row .image img{
   width: 40rem;
   border-radius: .5rem;
}

.about .row .content{
   flex:1 1 40rem;
}

.about .row .content h3{
   font-size: 3rem;
   color: var(--sub-color);
   text-transform: capitalize;
   margin-bottom: 1rem;
}

.about .row .content p{
   line-height: 2;
   padding: 1rem 0;
   font-size: 1.7rem;
   color: var(--sub-color);
}

.about .row.revers{
   flex-flow: row-reverse;
   margin: 3rem 0;
   flex-wrap: wrap;
}

.services .box-container{
   display: grid;
   grid-template-columns: repeat(auto-fit, minmax(28rem, 1fr));
   gap: 1.5rem;
   justify-content: center;
   align-items: flex-start;
}

.services .box-container .box{
   padding: 2rem;
   text-align: center;
}

.services .box-container .box img{
   height: 7rem;
   margin-bottom: 1rem;
}

.services .box-container .box h3{
   font-size: 2rem;
   color: var(--sub-color);
   text-transform: capitalize;
   margin: 1rem 0;
}

.services .box-container .box p{
   line-height: 2;
   font-size: 1.5rem;
   color:var(--sub-color);
}

.reservation form{
   border: var(--border);
   padding: 2rem;
}

.reservation form .flex{
   display: flex;
   flex-wrap: wrap;
   gap: 1.5rem;
}

.reservation form h3{
   background-color: var(--sub-color);
   color: var(--main-color);
   font-size: 2.5rem;
   margin-bottom: 2rem;
   border-radius: .5rem;
   padding: 1.2rem;
   text-align: center;
   text-transform: capitalize;
}

.reservation form .flex .box{
   flex: 1 1 40rem;
   text-align: center;
   color: var(--sub-color);
   font-size: 2rem;
}

.reservation form .flex .box p{
   font-size: 1.8rem;
   color: var(--sub-color);
}

.reservation form .flex .box .input{
   padding: 1rem 0;
   margin: 1rem 0;
   border-bottom: var(--border);
   background: var(--main-color);
   color: var(--white);
   font-size: 1.8rem;
   width: 100%;
}

.reservation form .flex .box input[type="date"]::-webkit-calendar-picker-indicator{
   filter: invert(1);
}

.gallery img{
   height: 40rem;
   width: 60rem;
   border-radius: .5rem;
   object-fit: cover;
   margin-bottom: 4rem;
   user-select: none;
}

.swiper-pagination-bullets.swiper-pagination-horizontal{
   bottom: 0;
}

.swiper-pagination-bullet{
   background-color: var(--sub-color);
}

.swiper-pagination-bullet-active{
   background-color: var(--white);
}

.contact .row{
   display: flex;
   align-items: flex-start;
   gap: 3rem;
   flex-wrap: wrap;
}

.contact .row form{
   flex: 1 1 40rem;
   border: var(--border);
   border-radius: .5rem;
   padding: 2rem;
   text-align: center;
}

.contact .row .faq{
   flex: 1 1 40rem;
}

.contact .row form h3{
   margin-bottom: 1rem;
   border-radius: .5rem;
   padding: 1.2rem;
   color: var(--main-color);
   background-color: var(--sub-color);
   font-size: 2.2rem;
   text-transform: capitalize;
}

.contact .row form .box{
   padding: 1rem 0;
   margin: 1rem 0;
   border-bottom: var(--border);
   font-size: 1.8rem;
   color: var(--sub-color);
   background:var(--main-color);
   width: 100%;
}
.contact .row .flexi .box{
   padding: 1rem 0;
   margin: 1rem 0;
   border-bottom: var(--border);
   font-size: 1.8rem;
   color: var(--sub-color);
   background:var(--main-color);
   width: 100%;
}
.contact .row .flexi .box .input {
   width: 100%;
   height: 200px;
   background:var(--sub-color);
}
.contact .row form .box::placeholder{
   color: rgba(220, 198, 156, .6);
}

.contact .row form textarea{
   height: 15rem;
   resize: none;
}

.contact .row .faq .title{
   padding-bottom: .5rem;
   font-size: 2.5rem;
   color: var(--sub-color);
   text-transform: capitalize;
   text-align: center;
}

.contact .row .faq .box{
   border-radius: .5rem;
   border: var(--border);
   margin-top: 2rem;
}

.contact .row .faq .box h3{
   background-color: var(--sub-color);
   color: var(--main-color);
   padding: 1.5rem;
   font-size: 2rem;
   border-radius: .5rem;
   cursor: pointer;
}

.contact .row .faq .box p{
   padding:1.5rem 2rem;
   line-height: 2;
   font-size: 1.6rem;
   color: var(--sub-color);
   display: none;
}

.contact .row .faq .box.active p{
   display: inline-block;
}

.reviews{
   padding-top: 0;
}

.reviews .box{
   text-align: center;
   user-select: none;
   padding: 2rem;
   margin-bottom: 4rem;
}

.reviews .box img{
   height: 7rem;
   width: 7rem;
   border-radius: 50%;
   object-fit: cover;
}

.reviews .box h3{
   margin: 1.5rem 0;
   font-size: 2rem;
   color: var(--sub-color);
}

.reviews .box p{
   line-height: 2;
   font-size: 1.5rem;
   color: var(--sub-color);
}

.footer .box-container{
   display: grid;
   grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
   gap: 1.5rem;
   justify-content: center;
   align-items: flex-start;
   padding-bottom: 3rem;
}

.footer .box-container .box a{
   display: block;
   font-size: 1.8rem;
   color: var(--sub-color);
   padding: 1rem 0;
}

.footer .box-container .box a:hover{
   color: var(--white);
}

.footer .box-container .box:first-child i{
   margin-right: 1.7rem;
}

.footer .box-container .box:nth-child(2){
   text-align: center;
}

.footer .box-container .box:last-child{
   text-align:right;
}

.footer .box-container .box:last-child i{
   margin-left: 1.7rem;
}

.footer .credit{
   border-radius: .5rem;
   padding: 2rem;
   text-align: center;
   color: var(--main-color);
   background-color: var(--sub-color);
   font-size: 2rem;
   margin-bottom: 8rem;
}
/* media queries  */

@media (max-width:991px){

   html{
      font-size: 55%;
   }

   .header .flex .fa-bars{
      display: inline-block;
   }

   .header .flex .btn{
      display: none;
   }

   .header .navbar{
      flex-flow: column;
      padding: 2rem;
      display: none;
   }

   .header .navbar.active{
      display: flex;
   }

}

@media (max-width:768px){

   .home .box img{
      height: 40vh;
   }

   .swiper-button-next,
   .swiper-button-prev{
      top: 35%;
   }

}

@media (max-width:450px){

   html{
      font-size: 50%;
   }

   .header .flex .logo{
      font-size: 2rem;
   }

   .home .box img{
      height: 25rem;
   }

   .about .row .image img{
      width: 100%;
   }

   .gallery img{
      height: 25rem;
      width: 30rem;
   }

}
</style>

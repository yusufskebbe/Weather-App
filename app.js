
window.addEventListener('load',()=>{

    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimeZone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    let feelsLike = document.querySelector('.feels-like');


    const temperatureSpan = document.querySelector('.temperature span');
    
    
    

   


    if(navigator.geolocation){ // if this thing exect in the browser then we can find the exact positon of the user  pop up


        navigator.geolocation.getCurrentPosition(position =>{

           long = position.coords.longitude;
           lat = position.coords.latitude;

           const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=alerts,daily&appid=832be794a862627b8927924a12b0dc59`;

           fetch(api) // getting information from the url
           .then(response =>{
               return response.json();
           })
           .then(data =>{
               console.log(data);
               
               const {temp,wind_speed,feels_like} = data.current;
           

               
               // set DOM elements from API 
            

                let c = temp - 273;

                
            

               temperatureDegree.textContent = c.toFixed(0) + " °C";


               
              

                if(c<0){

                    document.body.style.backgroundImage = "url('https://i.gifer.com/67Z.gif')";

                
                }
                
                
                else if(c<10 && wind_speed>0){


                    document.body.style.backgroundImage = "url('https://1.bp.blogspot.com/-T85naTcMAYA/VzNJ12hg2iI/AAAAAAAAAIk/Q9r0MLjbqX4IUFb1gRAl8DyhkVM-VIT6gCLcB/s1600/1miEZBL.gif')";
   
                   
                   }
                

               temperatureDescription.textContent = "wind speed is " + wind_speed;
            
               locationTimeZone.textContent = data.timezone;
              
               const cFeelsLike = feels_like - 273;
               feelsLike.textContent = "Feels like  " + cFeelsLike.toFixed(0) + " °C";
                

               // set ICon

               setIcon(icon,document.querySelector(".icon"));

               // chage temrature from Kelvin to c 

               temperatureSection.addEventListener('click', ()=>{

                   if(temperatureSpan.textContent === 'K'){
                       temperatureSpan.textContent = 'C';
                       temperatureDegree.textContent = c.toFixed(0);

                   }
                   else {
                    temperatureSpan.textContent = 'K';
                    temperatureDegree.textContent = temp;
                }

               })

           });

        });


       
    }



    function setIcon(icon,iconId){


        const skycons = new Skycons({color:"white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconId,Skycons[currentIcon]); 

    }



    function calToKel(c , k) {


        c = 273 - k;

        return c.toFixed(0);


    }
   


});
const weatherform = document.querySelector(".weatherfrom");
const inputdisplay = document.querySelector(".inputcity");
const card = document.querySelector(".card");
const apikey="3230eb0d5ac5abbe07c404dee9507c07";

weatherform.addEventListener("submit", async event =>{

    event.preventDefault();

    const city = inputdisplay.value;
    if(city){
        try{
            const weatherdata = await getweatherdata(city);
            displayweatherinfo(weatherdata);
        }
        catch(error){
            console.error(error);
            displayerror(error);
        }

    }
    else{
        displayerror(" Please Enter a City");
    }

})


async function  getweatherdata(city){
  const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

  const response = await fetch(apiurl);

  if(!response.ok){
     throw new Error("Could not fetch weather data");
  }
  return  await response.json();
}


function displayweatherinfo(data){

    const {name:city ,
         main:{temp,humidity},
          weather:[{description,id}]}= data;
        
    card.textContent="";
    card.style.display="flex";

    const displaycity = document.createElement("h1");
    const displaytemp = document.createElement("p");
    const displayhumid = document.createElement("p");
    const displaydesc = document.createElement("p");
    const displayemoji = document.createElement("p");

    displaycity.textContent = city;
    displaytemp.textContent = `${(temp-273.15).toFixed(1)}°c`;
    displayhumid.textContent = `Humidity : ${humidity}%`;
    displaydesc.textContent = description;
    displayemoji.textContent = displayemodji(id);

    displaycity.classList.add("citydis");
    displaytemp.classList.add("tempdis");
    displayhumid.classList.add("humdidis");
    displaydesc.classList.add("discdisplay");
    displayemoji.classList.add("imjofweth");

    card.appendChild(displaycity);
    card.appendChild(displaytemp);
    card.appendChild(displayhumid);
    card.appendChild(displaydesc);
    card.appendChild(displayemoji);
    

}


function displayemodji(emodjid){
   switch(true){
     case (emodjid >= 200 && emodjid<300):
        return "⛈️";
   
     case (emodjid >= 300 && emodjid < 400):
        return "🌦️";
    
     case (emodjid >= 500 && emodjid < 600):
        return "🌧️";
    
     case (emodjid >= 600 && emodjid<700):
        return "❄️";
     
      case (emodjid >= 700 && emodjid<800):
        return "🌫️";
    
      case (emodjid === 800):
        return "☀️";
     
     case (emodjid >= 801  && emodjid< 810 ):
        return "☁️";
     default:
        return "❓";
   }

}


function displayerror(message){
    const errormessage = document.createElement("p");
    errormessage.textContent = message;
    errormessage.classList.add("errordisplay");

    card.textContent="";
    card.style.display="flex";
    card.appendChild(errormessage);


} 
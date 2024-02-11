window.addEventListener('load' , () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let temperatureLocation = document.querySelector(".location-timezone");

    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span")
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';

            const api= `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
        
            fetch(api)
            .then(response => {
                return response.json();
            })

            .then(data =>{
                console.log(data); 
                const {temperature, summary , icon} = data.currently;
                //set DOM Elements from the API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                temperatureLocation.textContent = data.timezone;

                // fromula for celcius 
                let celcius = (temperature - 32) * (5 / 9);

                //set icon
                setIcons(icon, document.querySelector('.icon'));
                
                // changing temperture celsius to farenhite
                temperatureSection.addEventListener('click' , () => {
                    if(temperatureSpan.textContent === "F"){
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celcius);
                    } else{
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent =temperature;
                    }
                })
            });
        });

    }else{
        h1.textContent = "hey this is not working ): because you didn't allow us" ;
    }


    function setIcons(icon , iconID){
        const skycons = new Skycons({color : "white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});
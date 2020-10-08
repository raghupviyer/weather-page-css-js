window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description")
    let temperatureDegree = document.querySelector(".temperature-degree")
    let locationTimezone = document.querySelector(".location-timezone")
    const icon = document.querySelector('img');
    const temperatureSection = document.querySelector('.temperature');
    const unit = document.querySelector('.unit');
    //the incorrect name of the icons is received by the api......it has to be corrected and the corect icon name is stored in the variable "correctIcon" to match the name of SKYCONS

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.lattitude;
            //const url = `https://api.darksky.net/forecast/5e0be0dfcb615557affd72a4b26bf653/${lattitude},${longitude}?units=auto`//darksky api
            const api = `http://api.weatherstack.com/current?access_key=7f99730d72ee1afc12631f67e23c4eca&query=New York`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const { temperature, weather_descriptions, weather_icons } = data.current;
                    const { timezone_id } = data.location;
                    temperatureDescription.textContent = weather_descriptions[0];
                    temperatureDegree.textContent = temperature;
                    locationTimezone.textContent = timezone_id;
                    icon.src = weather_icons;

                    const fahrenheit = (temperature * 9 / 5) + 32;

                    temperatureSection.addEventListener('click', () => {
                        if (unit.textContent == "F") {
                            unit.textContent = "C"
                            temperatureDegree.textContent = temperature;
                        }
                        else {
                            unit.textContent = "F"
                            temperatureDegree.textContent = fahrenheit;
                        }
                        console.log("click");
                    })
                })

            // function skycons(icon, iconID) {
            //     const skycons = new Skycons({ color: "white" });
            //     const correctIcon = icon.replace(/-/g, "_").toUpperCase;
            //     skycons.set(iconID, Skycons[correctIcon])
            //     skycons.play();
            // }
            
        })
    } 
})

const key = "a728db4f8b3951227ca3f0d20c54cd11";
// q={city name}&appid=`${key}
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchbox = document.querySelector(".searchbar input");
const searchbtn = document.querySelector(".searchbar button");
const weathericon = document.querySelector(".icon")
const left = document.querySelector(".circle1");
const right = document.querySelector(".circle2");
async function checkweather(city) {
    const response = await fetch(apiurl + city + `&appid=${key}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".box").style.display = "none";
        document.querySelector(".content").style.height = "18%";
    } else {
        var data = await response.json();


        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humid").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
        if (data.weather[0].main == "Clouds") {
            weathericon.src = "cloud.png"
        } else if (data.weather[0].main == "Clear") {
            weathericon.src = "sun.png"
        } else if (data.weather[0].main == "Drizzle") {
            weathericon.src = "snow.png"
        } else if (data.weather[0].main == "Mist") {
            weathericon.src = "fog.png"
        }
        document.querySelector(".box").style.display = "block";
        document.querySelector(".error").style.display = "none";
        document.querySelector(".content").style.height = "600px";
        document.querySelector(".content").style.background = "rgb(0, 0, 0)";
        document.querySelector(".content").style.background = "rgba(0, 0, 0, 0.4)";
    }

}


async function convertF(city) {
    const response = await fetch(apiurl + city + `&appid=${key}`);
    var data = await response.json();
    document.querySelector(".temp").innerHTML = ((Math.round(data.main.temp) * 1.8) + 32) + "°F";
}

async function convertK(city) {
    const response = await fetch(apiurl + city + `&appid=${key}`);
    var data = await response.json();
    document.querySelector(".temp").innerHTML = Math.round(Math.round(data.main.temp) + 273.15) + "°K";
}
left.addEventListener("click", () => {
    convertF(searchbox.value);
})
right.addEventListener("click", () => {
    convertK(searchbox.value);
})
searchbtn.addEventListener("click", () => {
    checkweather(searchbox.value);
})
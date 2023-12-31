const apiKey = "YOUR_API_KEY";
let cityName = "Sulaymaniyah";
const city = document.querySelector(".city");
const temp = document.querySelector(".temp");
const weather = document.querySelector(".weather");
const minTemp = document.querySelector(".minTemp");
const maxTemp = document.querySelector(".maxTemp");
const searchBtn = document.querySelector(".searchBtn");

async function getWeather() {
  let input = document.getElementById("searchInput").value;
  if (input) cityName = input;

  let res;
  let lat;
  let lon;
  try {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`
    );
    res = await response.json();
    lat = res[0].lat;
    lon = res[0].lon;
    const response2 = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );
    res = await response2.json();
    city.innerText = `${res.name}, ${res.sys.country}`;
    temp.innerText = `${Math.round(res.main.temp - 273.15)}°`;
    weather.innerText = res.weather[0].main;
    minTemp.innerText = `${Math.round(res.main.temp_min - 273.15)}°`;
    maxTemp.innerText = `${Math.round(res.main.temp_max - 273.15)}°`;
    // console.log(res);
  } catch (error) {
    city.innerText = `City Not Found`;
    temp.innerText = `-`;
    weather.innerText = `-`;
    minTemp.innerText = `-`;
    maxTemp.innerText = `-`;
    // console.log(error);
  }
}

getWeather();

searchBtn.addEventListener("click", () => {
  let input = document.getElementById("searchInput").value;
  if (input) getWeather();
});

// text box for city
let cityInput;
// chosen city
let city;
// text about weather
let weatherOutput;
// canvas reference
let canvas;
// weather icon
let weatherIcon;

//colour
let coldColour = [102,255,255];
let hotColour = [255,204,102];
let outputColour = [];



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function newCity() {
  if(loading){
    return;
  }
  loading = true;
  weatherOutput.html("Loading");
  select('#time').html("");
  city = cityInput.value();
  if(forecastCheckbox.checked){
    forecast = true;
    url = urlForecast + city + urlReplyMode + urlMetric + apiKey;
  }else{
    forecast = false;
    url = urlCurrentWeather + city + urlParameters;
  }
  loadJSON(url, loadedJSON, jsonErr);
}

function loadedJSON(data) {
  loading = false;
  // console.log(data);
  let weather;
  let country;
  if(forecast){
    weather = data.list[7];
    country = data.city.country;
  }else{
    weather = data;
    country = weather.sys.country;
  }
  for (var i = 0; i < coldColour.length; i++) {
    outputColour[i] = map(weather.main.temp, -10, 30, coldColour[i], hotColour[i], true);
  }
  document.body.style.backgroundColor = color(outputColour[0], outputColour[1], outputColour[2]);
  city = city.charAt().toUpperCase() + city.substr(1).toLowerCase();
  let foundComma = city.search(",");
  if(foundComma != -1){
    city = city.slice(0, foundComma);
  }
  let str = "The temperature in " + city + ", " + country + " is " + weather.main.temp + "°C, and the humidity is "+ weather.main.humidity + "%, " + weather.weather[0].description;
  // console.log();
  weatherOutput.html(str);
  weatherIcon.style.visibility = "visible";
  weatherIcon.src = 'images/' + weather.weather[0].icon + '.png';
  if(forecast){
    select('#time').html(weather.dt_txt);
  }else{
    select('#time').html("");
  }
  // console.log(weatherIcon);
}



function jsonErr(err) {
  loading = false;
  console.log(err);
  weatherIcon.style.visibility = "hidden";
  weatherOutput.html("Sorry, an error occured. Please, check spelling mistakes and internet connection.");
}

                        // variables
//url settings
let urlCurrentWeather = "http://api.openweathermap.org/data/2.5/weather?q=";
let urlForecast = "http://api.openweathermap.org/data/2.5/forecast?q=";
let urlReplyMode = "&mode=json";
let urlMetric = "&units=metric";
let apiKey = "&APPID=3a2579f41685a68c39457b5e3d53743d";
let urlParameters;
let url;
// string to show time
let timeString;
// if show forecast checkbox
let forecastCheckbox;
// if forecast
let forecast = false;
// if is currently loading
let loading = false;

function setup() {
  // combine url parameters
  urlParameters = urlMetric + apiKey;
  // setup the canvas
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', -1);
  // get html elements
  weatherIcon = document.getElementById(("weatherIcon"));
  cityInput = select('#cityInput');
  weatherOutput = select('#weatherOutput');
  forecastCheckbox = document.getElementById("forecast");
  // set city search event
  cityInput.changed(newCity);
  // start request
  newCity();
}

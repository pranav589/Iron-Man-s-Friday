const api = "f2555d1e94599dfc0b75bb332b9be43e"


const voice = document.querySelector('.voice');


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

function startListening() {
  const recorder = new SpeechRecognition();
  recorder.start();
  recorder.onstart = console.log('started listening..');
  recorder.onresult = function(data) {
    handleResults(data);
  }
  document.querySelector('.coil-container').classList.toggle('run');


}

function handleResults(data) {
  let text = data.results[0][0].transcript;
  text = text.toLowerCase();

  processCommand(text)
}

function processCommand(userText) {

  if (userText.includes('friday')) {
    speak('hello sir')
  } else if (userText.includes('hi') || userText.includes('hello') || userText.includes('hey')) {
    speak('Hello, how are you?')
  } else if (userText.includes('how are your?')) {
    speak("I'm doing fabulous. What about you?")
  } else if (userText.includes('i am fine') || userText.includes('i am good') || userText.includes('great')) {
    speak('Thats awesome!')
  } else if (userText.includes('open instagram')) {
    window.open("https://www.instagram.com");
    speak('Opening enstagraam')
  } else if (userText.includes('open facebook') || userText.includes('open fb')) {
    window.open("https://www.facebook.com")
    speak('Opening Facebook')
  } else if (userText.includes('open calculator')) {
    window.open('https://calculator-web-app.netlify.app/');
    speak('Opening calculator')
  } else if (userText.includes('weather')) {
    getWeather();
  } else if (userText.includes('time')) {
    getCurrentTime();
  } else if (userText.includes('bye') || userText.includes('tata')) {
    speak('Bye. Have agreat day ahead.')
  } else if (userText.includes('gmail')) {
    window.open('https://www.gmail.com');
    speak('Opening Gmail')
  } else {
    speak("Sorry, I didn't understand that")
  }
}


function getCurrentTime() {
  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  currentTimeis = `${(hours%12) ||12}:${minutes}`;

  speak('The Time is..' + currentTimeis)
}

function speak(TEXT) {
  const utter = new SpeechSynthesisUtterance();

  utter.text = TEXT;

  window.speechSynthesis.speak(utter);
}



function getWeather() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(async function(position) {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}&units=metric`;

      let response = await fetch(api_url);

      let data = await response.json();
     
      manipulateWeatherData(data);
    })
}}


function manipulateWeatherData(data) {
  let city = data.name;
  let temp = data.main.temp;
  let icon = data.weather[0].icon;
  let description = data.weather[0].description;

  let msg = `Its ${description} in ${city}`;
  speak(msg)
}


voice.addEventListener('click', startListening)
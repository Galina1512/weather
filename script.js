const api = {
    endpoint:"https://api.openweathermap.org/data/2.5/",
    key:"15b60d7785de6fd5e3d77f3b26884107"
}

const geoApi = {
    endpoint: "https://ipgeolocation.abstractapi.com/v1/",
    key: "eb82e680d3054f71b45f821c6afaa067",
}


    // поиск города по геолокации через geoApi
    async function geolocation() {
        const result = await fetch(`${geoApi.endpoint}?api_key=${geoApi.key}`);
        const resultReceived = await result.json();
       const city = document.querySelector(".city_start");
        city.textContent = `${resultReceived.city}, ${resultReceived.country}`;
        let cityStart = `${resultReceived.city}`;
        getInfoGeoF(cityStart);
        information(cityStart);
    }    
    geolocation();

    // поиск погоды на API по городу геолокации
    async function information(cityStart) {
     const resGeo = await fetch(`${api.endpoint}weather?q=${cityStart}&units=metric&lang=ru&appID=${api.key}`);
     const resultGeo = await resGeo.json();
     
     displayResultGeo(resultGeo);
 }

     // вывод на экран погоды по городу геолокации
 async function  displayResultGeo(resultGeo){
    let tempera_C = document.querySelector('#tempera_C');
    tempera_C.innerHTML = `${resultGeo.main.temp.toFixed(1)}<span>℃</span>`;

    let feelsLike = document.querySelector('#feels');
    feelsLike.innerHTML = 'Ощущается как '+`${Math.round(resultGeo.main.feels_like)}<span>℃</span>`;

    let condishion = document.querySelector('#condishion');
    condishion.textContent = `${resultGeo.weather[0].description}`;

    let wind = document.querySelector('#wind');
    wind.innerHTML ='Ветер '+`${resultGeo.wind.speed.toFixed(1)} <span> м/сек</span>`;

    
    getOurDate();
 }

// поиск температуры в градусах Форенгейта для геолокации
async function getInfoGeoF(cityStart){
    const GeoF = await fetch(`${api.endpoint}weather?q=${cityStart}&units=imperial&appID=${api.key}`);
    const resultGeoF = await GeoF.json();

     displayResultGeoF(resultGeoF);
    }

// вывод на экран температуры в градусах Форенгейта для геолокации
function displayResultGeoF(resultGeoF){
        let tempera_F = document.querySelector('#tempera_F');
        tempera_F.innerHTML = `${resultGeoF.main.temp.toFixed(1)}<span>℉</span>`;
    }    

// поиск города через input
const input = document.querySelector('#input');
input.addEventListener('keydown', enter);

function enter(e){
    if(e.keyCode===13){
        let data = input.value;
        input.value = '';
        getInfo(data);
        getInfoF(data);

    }
}

// получение данных с API погоды на русском языке
async function getInfo(data){
const res = await fetch(`${api.endpoint}weather?q=${data}&units=metric&lang=ru&appID=${api.key}`);
const result = await res.json();

 displayResult(result);
}

// вывод полученных данных на экран
function displayResult(result){

let city = document.querySelector('#city');
city.textContent = `${result.name}, ${result.sys.country}`;

getOurDate();

let tempera_C = document.querySelector('#tempera_C');
tempera_C.innerHTML = `${result.main.temp.toFixed(1)}<span>℃</span>`;

let feelsLike = document.querySelector('#feels');
feelsLike.innerHTML = 'Ощущается как '+`${Math.round(result.main.feels_like)}<span>℃</span>`;

let condishion = document.querySelector('#condishion');
condishion.textContent = `${result.weather[0].description}`;

let wind = document.querySelector('#wind');
wind.innerHTML ='Ветер '+`${result.wind.speed.toFixed(1)} <span> м/сек</span>`;

getImage(city)
}

// // поиск на API и вывод температуры в градусах Форенгейта
async function getInfoF(data){
    const resF = await fetch(`${api.endpoint}weather?q=${data}&units=imperial&appID=${api.key}`);
    const resultF = await resF.json();
    
     displayResultF(resultF);
    }

function displayResultF(resultF){
    let tempera_F = document.querySelector('#tempera_F');
    tempera_F.innerHTML = `${resultF.main.temp.toFixed(1)}<span>℉</span>`;
}    

//  вывод даты и времени
function getOurDate(){
    const myDate = new Date();
    const days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
    let date = days[myDate.getDay()];

    let number =  myDate.getDate();

    const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];   
    let month = months[myDate.getMonth()];

    let yeat = myDate.getFullYear();
    let showDate = document.querySelector('#date');
 
  showDate.innerHTML = `${date} `+` ${number}`+' '+`${month}`+' '+`${yeat}`;

  let showHours = document.querySelector("#hours");
    let hours = myDate.getHours();
    let minutes = myDate.getMinutes();
    
    showHours.innerHTML = `${hours}`+ ' : '+`${minutes}`;
    if (minutes<10 && hours <10 )  {
        showHours.innerHTML = '0' + `${hours}`+ ' : '+ '0' + `${minutes}`;
    }
    else if (minutes<10 ){
        showHours.innerHTML = `${hours}`+ ' : '+ '0' + `${minutes}`;
    }
    else if (hours <10){
        showHours.innerHTML = '0' + `${hours}`+ ' : ' + `${minutes}`
    };
}



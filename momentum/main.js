const time = document.getElementById('time'),
    greeting = document.getElementById('greeting'),
    name = document.getElementById('name'),
    focus = document.getElementById('focus');

let nameValue = '';

//const showAmPm = true;

const dayWeek = document.getElementById('dayWeekDateMonth');

//for slider background
const base1 = 'assets/images/night/';
const base2 = 'assets/images/morning/';
const base3 = 'assets/images/day/';
const base4 = 'assets/images/evening/';
const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg'];
let i = 0;

let objectViewBgImage = {};
let countClickImg = 0;
let hour = 0;

function showTime() {
    //let today = new Date(2019, 06, 10, 20, 33, 30),
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();

    //const amPm = hour >= 12 ? 'PM' : 'AM';
    //hour = hour % 12 || 12;
    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
    //time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)} ${showAmPm ? amPm : ''}`;
    setTimeout(showTime, 1000);
}

function showDayWeek() {
    let daysWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    let monthes = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

    let today = new Date(),
        dayWeek = daysWeek[today.getUTCDay()];
    day = (today.getUTCDate());
    month = monthes[today.getMonth()];



    dayWeekDateMonth.innerHTML = `${dayWeek}<span>, </span>${day}<span> </span>${month}`;
    setTimeout(showDayWeek, 1000);
}

function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function setBgGreet() {
    //let today = new Date(2019, 06, 10, 20, 33, 30),
    let today = new Date(),
        hour = today.getHours();

    document.body.style.backgroundImage = objectViewBgImage[hour];

    document.body.style.color = 'white';

    if (hour < 6) {
        greeting.textContent = 'Good Night,';
    } else if (hour < 12) {
        greeting.textContent = 'Good Morning,';
    } else if (hour < 18) {
        greeting.textContent = 'Good Afternoon,';
    } else if (hour < 24) {
        greeting.textContent = 'Good Evening,';
    }

}

const btn = document.querySelector('.btn');

function getImage() {
    if (hour + countClickImg === 23) {
        countClickImg = hour * -1;

    } else {
        countClickImg++;
    }

    document.body.style.backgroundImage = objectViewBgImage[hour + countClickImg];
    btn.disabled = true;
    setTimeout(function() { btn.disabled = false }, 1000);
    console.log(countClickImg);
}

btn.addEventListener('click', getImage);

function viewBgImage(data) {
    let imgNumber;
    for (let key = 0; key <= 23; key++) {
        if (key >= 0 && key < 6) {
            imgNumber = Math.floor(Math.random() * (20 - 1) + 1);
            objectViewBgImage[key] = "url('assets/images/night/" + addZero(imgNumber) + ".jpg')";
        }
        if (key > 5 && key < 12) {
            imgNumber = Math.floor(Math.random() * (20 - 1) + 1);
            objectViewBgImage[key] = "url('assets/images/morning/" + addZero(imgNumber) + ".jpg')";
        }
        if (key > 11 && key < 18) {
            imgNumber = Math.floor(Math.random() * (20 - 1) + 1);
            objectViewBgImage[key] = "url('assets/images/day/" + addZero(imgNumber) + ".jpg')";
        }
        if (key > 17 && key < 24) {
            imgNumber = Math.floor(Math.random() * (20 - 1) + 1);
            objectViewBgImage[key] = "url('assets/images/evening/" + addZero(imgNumber) + ".jpg')";
        }

    }
    setBgGreet();

}

function addZero(number) {
    if (String(number).length === 1) {
        number = '0' + number;
    }
    return number;
}

function getName() {
    if (localStorage.getItem('name') === null) {
        name.textContent = '[Enter Name]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

function setName(e) {
    nameValue = name.innerText;
    name.innerText = '';
}

function focusBlur(e) {
    name.innerText = name.innerText.trim();
    if (name.innerText.length === 0) {
        name.innerText = nameValue;
    } else {
        localStorage.setItem('name', e.target.innerText);
    }

}

function pressEnter(e) {
    if (e.code === 'Enter') {
        name.blur();
    }
}

function getFocus() {
    if (localStorage.getItem('focus') === null) {
        focus.textContent = '[Enter Focus]';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}

function setFocus(e) {
    focus.innerText = focus.innerText.trim();
    if (focus.innerText.length === 0) {
        focus.innerText = localStorage.getItem('focus');
    } else {
        localStorage.setItem('focus', e.target.innerText);
    }

}

function pressEnterFocus(e) {
    if (e.code === 'Enter') {
        focus.blur();
    }
}

function setEmptyFocus(e) {
    focus.innerText = '';
}

//Qoute
const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btn_q = document.querySelector('.btn_quote');

// префикс https://cors-anywhere.herokuapp.com используем для доступа к данным с других сайтов если браузер возвращает ошибку Cross-Origin Request Blocked 
async function getQuote() {
    const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru`;
    const res = await fetch(url);
    const data = await res.json();
    blockquote.textContent = data.quoteText;
    figcaption.textContent = data.quoteAuthor;
}
document.addEventListener('DOMContentLoaded', getQuote);
btn_q.addEventListener('click', getQuote);


//Weather
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');

const airHumidity = document.querySelector('.airHumidity');
const windSpeed = document.querySelector('.windSpeed');

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=b0242ad91c1a8fe6ec9ae5babd557309&units=metric`;
    //https://api.openweathermap.org/data/2.5/weather?q=%D0%9C%D0%B8%D0%BD%D1%81%D0%BA&lang=ru&appid=08f2a575dda978b9c539199e54df03b0&units=metric
    const res = await fetch(url);
    const data = await res.json();
    if (data.cod === 200) {

        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
        weatherDescription.textContent = data.weather[0].description;

        city.textContent = localStorage.getItem('city');

        airHumidity.textContent = `air humidity: ${data.main.humidity} %`;
        windSpeed.textContent = `wind speed: ${data.wind.speed}  m/c`;
    } else {
        city.innerText = data.message;
    }
}

function setCity(event) {
    if (event.code === 'Enter') {

        localStorage.setItem('city', event.target.innerText);

        getWeather();
        city.blur();
    } else {

        localStorage.setItem('city', event.target.innerText);

    }
}

function setCityClick() {
    city.innerText = '';
}

function focusBlurCity(e) {
    city.innerText = city.innerText.trim();
    if (city.innerText.length === 0) {
        city.innerText = localStorage.getItem('city');
    } else {
        localStorage.setItem('city', e.target.innerText);
    }

}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
city.addEventListener('click', setCityClick);
city.addEventListener('blur', focusBlurCity);

name.addEventListener('click', setName);
name.addEventListener('blur', focusBlur);
name.addEventListener('keypress', pressEnter);

focus.addEventListener('click', setEmptyFocus);
focus.addEventListener('blur', setFocus);
focus.addEventListener('keypress', pressEnterFocus);

window.addEventListener('load', viewBgImage);




showTime();
showDayWeek();
getName();
getFocus();
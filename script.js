// require('dotenv').config();
// const API = process.env.api_1;
let API 

let latIn=document.querySelector('.lat')
let lonIn=document.querySelector('.long')
let citya = document.querySelector('.cityInput')
let city

let landing =document.querySelector('.landing')
let options = document.querySelector('.options')
let welcome = document.querySelector('.welcome')
let coord = document.querySelector('.coord')
let result = document.querySelector('.result')

let wind = document.querySelector('.wind') 
let main =document.querySelector('.weather')
let description =document.querySelector('.description')
let humidity = document.querySelector('.humidity')
let minTemp = document.querySelector('.mintemp')
let maxTemp = document.querySelector('.maxtemp')
let visibility =document.querySelector('.visibility')
let temp = document.querySelector('.temp')
let cityName = document.querySelector('.cityName')
let date = document.querySelector('.date')
let statImage=document.querySelector('.image')
let cityInput = document.querySelector('.cityInput')
let showCityErr= document.querySelector('.Cityerr')
let showFail = document.querySelector('showError')
let errorSection = document.querySelector('.errorSection')


function byCityName(){
    city  = citya.value
    if (!city) {
        console.log(city)
        cityInput.style.border = 'solid 3px red'  
        showCityErr.style.display = 'block'
        showCityErr.textContent = 'Please enter a city name.';
        return;
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}`)
    .then(res => { if (!res.ok || res.status == 404) {
        if (res.status === 404) {
            throw new Error('Yo, Guess you mistyped the City name!!!');
        } else {
            throw new Error('Error fetching data from the server.');
        }
    }
    return res.json();
    })
    .then(data => {
        console.log(data)
        display(data)})
    .catch(error => err( error))
}
function byCoords(){
    citya.style.display = 'none'
    options.style.display= 'none'
    result.style.display= 'none'
    welcome.style.display= 'none'
    coord.style.display = 'block'

    // fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latIn}&lon=${lonIn}&appid=${API}`)
}
function geolocation(){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}`)

}
function a(){
    console.log(latIn)
}
function coords(){

}
let display = data =>{
    result.style.display= 'block'
    options.style.display = 'none'
    landing.style.display = 'none'
    welcome.style.display= 'none'
    changeBackgorund(data.weather[0].main)

    temp.innerText = (data.main.temp - 273.15).toFixed(2) + '°C'
    minTemp.innerText = (data.main.temp_min - 273.15).toFixed(2) + '°C'
    maxTemp.innerText = (data.main.temp_max - 273.15).toFixed(2) + '°C'
    visibility.innerText = "Visibility: " + data.visibility 
    humidity.innerText = "Humidity: " + data.main.humidity
    wind.innerText = "Wind Speed: " + data.wind.speed
    main.innerText = data.weather[0].main
    description.innerText = data.weather[0].description
    cityName.innerText = data.name
    date.innerText= getdate()   
}
function getdate(){
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const d = new Date()
    let month = months[d.getMonth()]
    let date = d.getDate()
    let year = d.getFullYear()
    return `${date} ${month} ${year}`
}
function changeBackgorund( status){
    let backgroundImage;
    let image

    const hours = new Date().getHours()
    const isDayTime = hours > 6 && hours < 18

            switch (status) {
                case 'Clear':
                    image = 'clear.svg';
                    backgroundImage ='clear.jpg'
                    break;
                case 'Clouds':
                    image = 'cloud.svg';
                    backgroundImage ='cloud.jpg'
                    break;
                case 'Rain':
                    image = 'rain.svg';
                    backgroundImage ='rain.jpg'
                    break;
                case 'Snow':
                    image = 'snow.svg';
                    backgroundImage ='snow.jpg'
                    break;
                case 'Thunderstorm':
                    image = 'storm.svg';
                    backgroundImage ='storm.jpg'
                    break;
                case 'Mist':
                case 'Smoke':
                case 'Haze':
                case 'Dust':
                case 'Fog':
                case 'Sand':
                case 'Ash':
                case 'Squall':
                case 'Tornado':
                    image = 'fog.svg';
                    backgroundImage ='fog.jpg'
                    break;
                default:
                    image = 'default.svg';
                    break;
            }
            if (isDayTime){
                backgroundImage1 = 'imgs/bg/daybg/' + backgroundImage 
                image = 'imgs/day/' + image
               
            }
            else{
                backgroundImage = 'imgs/bg/nightbg/' + backgroundImage 
                image = 'imgs/night/' + image
            }
            document.body.style.backgroundImage = `url(${backgroundImage})`;
            statImage.src = image


}
function tryAgain(){
    result.style.display= 'none'
    options.style.display = 'block'
    landing.style.display = 'block'
    welcome.style.display= 'block'
    coord.style.display = 'none'
    document.body.style.background ='none'


}
function err(error){
    if (error.message.includes('City')) {
        showCityErr.textContent = error.message;
    } else {
        result.style.display= 'none'
        options.style.display = 'none'
        landing.style.display = 'none'
        welcome.style.display= 'none'
        errorSection.style.display = 'block'
        showFail.textContent = 'Error while fetching data. Please try again.';
    }
}




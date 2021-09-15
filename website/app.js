/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip='
const API_KEY = '&appid=1e997f38aa70ea521b60b95fc898a7d1';
const zipCode = document.getElementById('zip');
const submitBtn = document.getElementById('generate');
const feelings = document.getElementById('feelings');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
submitBtn.addEventListener('click', getWeatherData);

/* Function called by event listener */
function getWeatherData(e) {
    e.preventDefault;

    if (!zipCode.value) {
        return alert('Please enter zip code');
    }

    if (!feelings.value) {
        return alert('Please enter how you feels');
    }

    getWeatherInfo(baseUrl,zipCode.value,API_KEY)
    .then(res => {
        let temp = res.main.temp;
        
        postWeatherData('/projectData', {
            date: newDate,
            temp: temp,
            content: feelings.value
        });
    });

    getDataForUi('/all')
    .then(res => {
        updateUI(res);
    })
}

// Update html file fundtion
function updateUI(res) {
    const date = document.getElementById('date');
    const temp = document.getElementById('temp');
    const content = document.getElementById('content');

    date.innerHTML = 'Date: ' + res.date;
    temp.innerHTML = 'Temprature: ' + res.temp + 'degrees';
    content.innerHTML = 'Your Feelings: ' + res.content;
}

// Get data from backend for UI
const getDataForUi = async (url) => {
    const res = await fetch(url);
    try {
        let data = await res.json();
        console.log(`data from server: ${data}`);

        return data;
    } catch (error) {
        console.log(`GET DATA ERROR: ${error}`);
    }
}

/* Function to POST data */
const postWeatherData = async (url, data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    try {
        let newData = await res.json();

        console.log(newData);
        return newData;
    } catch (error) {
        console.log(`POST ERROR: ${error}`);
    }
}

/* Function to GET Web API Data*/
const getWeatherInfo = async (baseUrl, zip, key) => {
    const res = await fetch(baseUrl+zip+API_KEY);
    try {
        let data = await res.json();
        console.log(data.cod);
        // Alert user if the zipcode is wrong or not found or return data
        return (data.cod !== 200) ? alert(`ERROR: ${data.message}`) : data;
    } catch(error) {
        console.log(`GET ERROR: ${error}`);
    }
}
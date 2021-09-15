
// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const PORT = 3000;
app.listen(PORT, listening);

// Server debug callback function
function listening() {
    console.log('Server started...');
    console.log(`Server running on localhost at port: ${PORT}`);
}

// POST and GET routes
app.get('/all', returnData);
app.post('/projectData', postData);


// Get data callback
function returnData(req, res) {
    res.send(projectData);
}

// Post data callback
function postData(req, res) {
    projectData = {
        date: req.body.date,
        temp: req.body.temp,
        content: req.body.content
    }

    console.log(`Data added Successfully`);
}
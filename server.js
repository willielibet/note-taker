const express = require('express');
const { urlencoded } = require('body-parser');
const path = require("path");
const fs = require('fs');

//json file
let db = require('./db/db.json');

//define a port to listen for incoming requests.
const PORT = 3000;

//create an instance of express.
const app = express();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + '/public')); 
// app.use(express(__dirname + '/public')); 


//this is the first html route: http://127.0.0.1:3000 
//it uses the GET verb of the app object (express).
app.get('/', (req, res) => {
    res.end(`It works!! Path Hit!: ${req.url}`);
});

//this is the second html route: http://127.0.0.1:3000/notes 
//it uses the GET verb of the app object (express).
app.get('/notes', (req, res) => {
    res.end(`It works!! Path Hit!: ${req.url}`);
});

//test by sending a string to the client when the user visits the PORT URL.
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
const express = require('express');
const { urlencoded } = require('body-parser');

//path module provides a way of working with directories and file paths.
const path = require("path");
//allows us to access the OS' file system.
const fs = require('fs');

//json file
let db = require('./db/db.json');

//define a port to listen for incoming requests.
//make the port dynamic and not hard coded.
const PORT = process.env.PORT || 3000;

//create an instance of express.
const app = express();

//middleware 1 & 2
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//middleware 3.
//when a request comes in for a static file, the express.static 
//middleware points the request to the proper folder where the 
//static asset can be found. Credit: TA Adam Hartleb (udemy).
//__dirname returns the current path of the application or the 
//directory that the currently executing script is in.
//static middleware serving files from the public directory to the client.
app.use(express.static(__dirname + '/public')); 
// app.use(express(__dirname + '/public')); 
// console.log("dirname " + __dirname)


//this is the first html route (root route): http://127.0.0.1:3000. 
//it uses the GET verb of the app object (express).
//express provides a method in the response object (res in our case)  
//of the router called sendFile() that can be used to serve static files. 
app.get('/', (req, res) => {
    //the path.join() method joins all given path segments 
    //together using the platform-specific separator as a delimiter.
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//this is the second html route: http://127.0.0.1:3000/notes. 
//it uses the GET verb of the app object (express).
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

//API route
//this reads the db.json file and displays its data in the browser.
app.get(`/api/notes`, (req, res) => {
    res.json(db);
});

//returns the home page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});


app.post('/api/notes', (req, res) => {
        //adds the new entry into the db.json file (in memory)
        db.push(req.body);

        //adds the new entry into the db.json file (into the physical db.json file)
        fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(db), (err) => {
            if (err) {
                throw err;
            }
            });

            //returns db.json with new content
            res.json(db);        
    });

//inform the client on which port this app listens on; throw an
//error if something goes wrong.
app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    }else {
    console.log(`The app is listening on port ${PORT}`);
    }
});

//app.listen(3000)
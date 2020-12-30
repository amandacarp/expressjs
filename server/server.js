//import express, path, fs, body-parser
const express = require('express');
let app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

//creat path for posts.json
const postPath = path.join(__dirname, 'posts.json')

//create express server that responds to the root get req
// app.get('/', (req, res) => {
//     res.send('Hello from the server side...');
// });

//create middleware that consoles every req.url and passes flow to next func
app.use((req, res, next) => {
    console.log(req.originalUrl)
    next();
});

//use express.static to serve files from public to root
app.use(express.static(path.join(__dirname, '../public')));

//ADVANCED
app.use(bodyParser.urlencoded({extended: false}));

const parsedForm = []

app.post('/formsubmission', (req, res) => {
    const formSubmit = {
        name: req.body.name,
        email: req.body.email
    }
    parsedForm.push(formSubmit)
    fs.appendFileSync(postPath, JSON.stringify(formSubmit));
    res.send(JSON.stringify(formSubmit));
});

app.listen(3000);
//import express, path, fs, body-parser
const express = require('express');
let app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const { nextTick } = require('process');

//create path for posts.json
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


app.post('/formsubmission', (req, res) => {
    const formSubmit = {
        name: req.body.name,
        email: req.body.email
    }
   const oldData = JSON.parse(fs.readFileSync(postPath));
   const newData = [formSubmit, ...oldData];
   fs.writeFileSync(postPath, JSON.stringify(newData), (err) => {
       if (err) console.log(err)
   })
    res.send(JSON.stringify(formSubmit));
});

app.get('/getposts', (req, res, next) => {
    const allData = JSON.parse(fs.readFileSync(postPath));
    res.send(allData);
});

app.get('/singlepost/:id', (req, res, next) => {
    const id = req.params.id;
    const allData = JSON.parse(fs.readFileSync(postPath));
    const individualPost = allData[id];
    res.send(individualPost);
})

app.get('/delete/:id', (req, res, next) => {
    const id = req.params.id;
    const allData = JSON.parse(fs.readFileSync(postPath));
    delete allData[id];
    fs.writeFileSync(postPath, JSON.stringify(allData.filter(x=>x)), (err) => {
        if (err) console.log(err);
    });
    res.send('Your item was deleted')
})



app.listen(3000);
const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require("body-parser");
app.use(bodyParser.json());
var cors = require('cors');
var http = require('http').createServer(app);
const googleAPIKey = require('./googleAPIkey.json').googleAPIkey;

app.use(cors());

app.get('/api/search-place', (req, res) => {
    let searchString = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?";
    let key = "&key=" + googleAPIKey;

    let search = req.url.split("?")[1];
    search = search.split("=")[1];
    let input = "input=" + search + "&inputtype=textquery";

    axios.get(searchString + input + key)
    .then(resp => {
            let placeSearch = "https://maps.googleapis.com/maps/api/place/details/json?placeid=";
            axios.get(placeSearch + resp.data.candidates[0].place_id + key)
            .then(placeRes =>{
                res.send({place: placeRes.data.result}) ;
            })
            .catch((err) => res.send({error: err}))
    })
    .catch((err) => res.send({error: "Couldn't find a location. Please try again."}))
    
})

const PORT = process.env.PORT || 5000;
http.listen(PORT);

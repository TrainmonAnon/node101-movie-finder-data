const express = require('express');
const logger = require('morgan');
const axios = require('axios');

const app = express();

var movieIds = new Map();
var movieTitles = new Map();

app.use(logger('dev'));

// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter
app.get('/', (req, res) => {
    var movieId = req.query.i;
    var movieTitle = encodeURIComponent(req.query.t);
    if (movieId){
        if (movieIds.has(movieId)){
            res.send(movieIds.get(movieId));
        }else{
            axios
                .get('http://www.omdbapi.com/?i=' + movieId + '&apikey=8730e0e')
                .then(response => {
                    res.send(response.data);
                    movieIds.set(movieId, response.data);
                });
        }
    }else if (movieTitle){
        if (movieTitles.has(movieTitle)){
            res.send(movieTitles.get(movieTitle));
        }else{
            axios
                .get('http://www.omdbapi.com/?t=' + movieTitle + '&apikey=8730e0e')
                .then(response => {
                    res.send(response.data);
                    movieTitles.set(movieTitle, response.data);
                })
                .catch(error =>{
                    console.log('error',error);
                });
        }
    }
});

module.exports = app;
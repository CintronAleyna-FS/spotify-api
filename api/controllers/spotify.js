const axios = require('axios')
const SpotifyToken = require('../models/spotifytoken');
const SpotifyWebApi = require('spotify-web-api-node');


// Validate a non-expired JWT exists in DB
exports.jwt = async (req, res, next) => {
    let now = new Date().getTime()
    // set req.spotifyToken to token from DB
    req.token = await SpotifyToken.findOne({}).sort({$natural:-1});
    // IF !req.spotifyToken go back to homescreen
    if (!req.token){
        res.redirect('http://localhost:3000/')
    } else if ( now > req.token.expires_in) {
        const refreshToken = req.token.refreshToken
         // create new spotify web api with credientals
        const spotifyApi = new SpotifyWebApi({
            redirectUri: "http://localhost:3000/",
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken,
        })
        // REFRESH ACCESS TOKEN
        spotifyApi.refreshAccessToken().then(
            (data) => {
                console.log('The access token has been refreshed!');
                console.log('refreshed token!' + data.body['access_token']);
                req.token.accessToken = data.body['access_token'];
                req.token.expires_in = (new Date().getTime()) + req.token.expires_in;
                req.token.save();
            }).catch((error) => {
                res.status(400).json({ message: error.message })
            })
    }
    return next();
}
  
// LOGIN
exports.login = (req, res, next) => {
    // store code from body
    const code = req.body.code

    // create new spotify web api with credientals
    const spotifyApi = new SpotifyWebApi({
        redirectUri: "http://localhost:3000/",
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
    })
    // authorize code for ACCESS TOKEN, REFRESH TOKEN, and EXPIRE IN
    spotifyApi.authorizationCodeGrant(code).then(data => {
        const spotifyToken = new SpotifyToken({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expires_in: (new Date().getTime()) + data.body.expires_in,
        })
        try {
            const newSpotifyToken = spotifyToken.save()
            res.status(201).json(newSpotifyToken);
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }).catch((err) => {
        console.log(err)
        res.sendStatus(400)
    })
}

// SEARCH

exports.search = async (req, res, next) => {
    let search = req.body.search
    await axios({
        method: 'GET',
        url: 'https://api.spotify.com/v1/search',
        params: {
          type: 'artist,playlist,show',
          q: search,
          limit: 3
        },
        headers: { 
          'Authorization': 'Bearer ' + req.token.accessToken,
          'Content-Type': 'application/json'
        }
      }).then(({data}) => {
        res.json(data)
      }).catch((error) => {
        console.log(error)
        res.json(error)
      })
}
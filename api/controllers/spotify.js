const axios = require('axios')
const SpotifyToken = require('../models/spotifytoken');
const SpotifyWebApi = require('spotify-web-api-node');


// Validate a non-expired JWT exists in DB
exports.jwt = async (req, res, next) => {
    let now = new Date().getTime()
    // set req.spotifyToken to token from DB
    req.token = await SpotifyToken.find().sort({$natural:-1}).limit(1);
    // IF !req.spotifyToken go back to homescreen
    if (!req.token){
        redirect('/')
    } else if ( now > req.token[0].expires_in) {
        const refreshToken = req.token[0].refreshToken
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
            console.log("DATA : " + data.body)
            }).catch((error) => {
                res.status(400).json({ message: error.message })
            })
    }else{
        console.log("Not Expired!")
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
            expires_in: (new Date().getTime())+ data.body.expires_in
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
const express = require('express');
const router = express.Router();
const SpotifyToken = require('../models/spotifytoken');
const SpotifyWebApi = require('spotify-web-api-node');

router.post('/login', (req, res) => {
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
            expires_in: data.body.expires_in
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
})

module.exports = router;
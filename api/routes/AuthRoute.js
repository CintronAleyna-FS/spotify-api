const express = require('express');
const router = express.Router();

const spotifyCtrl = require('../controllers/spotify')


router.post('/login', spotifyCtrl.login)

router.get('/search', spotifyCtrl.jwt, (req, res) => {
    console.log("search page")
})

module.exports = router;
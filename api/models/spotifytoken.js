const mongoose = require('mongoose');

const SpotifyTokenSchema = new mongoose.Schema({
    token: {
        type: String
    },
    expires_in: {
        type: Number
    }
})

module.exports = mongoose.model('SpotifyToken', SpotifyTokenSchema)
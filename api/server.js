const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors')

const app = express();

const PORT = process.env.PORT || 3001;

const DATABASE_URL = process.env.DATABASE_URL;

// mongoose server
mongoose.connect(DATABASE_URL, { useNewURLParser: true })
const db = mongoose.connection;
db.on('error', error => console.error(error))
db.once('open', () => console.log('Database connection established'))

// routes
const userRouter = require('./routes/AuthRoute');
app.use('/users', userRouter)

// server running
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})

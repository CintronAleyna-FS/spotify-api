# Project Overview
This project prompts the user to login in order to receive a jwt authorization token. Once authorized, the user is able to make global searches to 3 different endpoints using [Spotify Web API](https://developer.spotify.com/documentation/web-api/)

# Prerequisites
* npm >= v18.1.0
* Brew >= v3.5.4 (if MacOS)
* MongoDB >= v5.0.7
* Chrome/Firefox/Safari/Edge >= Latest 2 major versions
* Express >= v4.18.1
* dotenv >= 16.0.1

# Getting Started
Setup .env variables  
Download node_modules for this project
### To run backend API
cd api
npm start


# Links
* [http://localhost:3000](http://localhost:3000) - Link to the frontend application. This is the homepage.
* [http://localhost:3001](http://localhost:3001) - Link to the backend (Express) API.
* [http://localhost:3001/spotify/v1](http://localhost:3001/spotify/v1) - Link to the Spotify API middleware.
* [http://localhost:3001/spotify/v1/status](http://localhost:3001/spotify/v1/status) - Endpoint to check the status of our application's JWT. 
* [http://localhost:3001/spotify/v1/login](http://localhost:3001/spotify/v1/login) - Endpoint request a new JWT from Spotify using the authentication workflow
import React from 'react';

// SPOTIFY API AUTH URL
const client_id = process.env.REACT_APP_CLIENT_ID
const redirect_uri = 'http://localhost:3000/'
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`

function Login() {
    return (
        <div>
            <a href={AUTH_URL}>Login</a>
        </div>
    );
}


export default Login;
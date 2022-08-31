import React from 'react';
import MyNav from './components/MyNav'
// SPOTIFY API AUTH URL
const client_id = process.env.REACT_APP_CLIENT_ID
const redirect_uri = 'http://localhost:3000/'
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`

function Login({code}) {
    return (
        <div>
            <MyNav code={code}></MyNav>
            <div style={styles.center}>
                <a style={styles.btn} href={AUTH_URL}>Login with Spotify</a>
            </div>
        </div>
    );
}


export default Login;

const styles = {
    btn: {
        backgroundColor: "green",
        textAlign: 'center',
        display: 'flex',
        width: '15rem',
        padding: '1rem',
        cursor: 'pointer',
        fontSize: '30px',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '15px'
    },
    center: {
        margin: 0,
        verticalAlign: 'middle',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem'
    }
}
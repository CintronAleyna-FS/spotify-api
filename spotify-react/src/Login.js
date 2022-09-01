import React from 'react';
import MyNav from './components/MyNav'
import { BsSpotify } from 'react-icons/bs'
// SPOTIFY API AUTH URL
const client_id = process.env.REACT_APP_CLIENT_ID
const redirect_uri = 'http://localhost:3000/'
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`

function Login({code}) {
    return (
        <div className="w-full h-screen">
            <MyNav code={code}></MyNav>
            <div className="flex justify-center h-screen items-center flex-col">
                <BsSpotify size={40} color="#1cb955" className="mb-1"></BsSpotify>
                <p className="mb-4 text-xl font-bold">Please Login</p>
                <p className="mb-6 text-center">In order to search for artists, playlists, or shows <br></br> 
                you must login to your spotify account</p>
                <a style={styles.btn} className="text-center rounded-full w-80 h-14 p-1" href={AUTH_URL}>Login</a>
            </div>
        </div>
    );
}


export default Login;

const styles = {
    btn: {
        backgroundColor: "#1cb955",
        textAlign: 'center',
        cursor: 'pointer',
        fontSize: '30px',
        color: 'white',
        textDecoration: 'none',
    },
}
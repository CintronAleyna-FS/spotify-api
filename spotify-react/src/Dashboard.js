import axios from 'axios';
import React, { useState, useEffect } from 'react';
import MyNav from './components/MyNav'
import NoResults from './NoResults'

import useAuth from './useAuth';

function Dashboard({code}) {
    const accessToken = useAuth(code)
    const [search, setSearch] = useState("")
    const [rerender, setRerender] = useState(false)
    const [artists, setArtists] = useState([])
    const [playlists, setPlaylists] = useState([])
    const [shows, setShows] = useState([])    
    

    const handleKeyPress = (e) => {
        if(e.key === 'Enter'){
            if(!search) return
            else{
            axios.post('http://localhost:3001/search', {
            search
            }).then (res => {
                console.log(res.data)
                setArtists(res.data.artists.items.map(artist=>{
                    return artist
                }))
                setPlaylists(res.data.playlists.items.map(playlist=>{
                    return playlist
                }))
                setShows(res.data.shows.items.map(show =>{
                    return show
                }))

            }).catch((err) => {
                console.log(err)
            })
            }
            setRerender(true)
        }
    }
    const handleChange = (e) => {
        setSearch(e.target.value)
    }
    

    return (
        <div>
            <MyNav code={code} handleKeyPress={handleKeyPress} handleChange={handleChange} search={search}></MyNav>
            {
                rerender === false ?
                    <NoResults></NoResults>
                : (
                    <div className="text-center flex flex-col items-center p-2 mt-16 space-y-12 ">
                        <div className="flex flex-row space-x-12 p-2">
                            <p className="underline mt-auto mb-auto text-2xl mr-24">Artists ➜</p>
                            {artists.map(artist =>{
                                return(
                                    <div>
                                        <a href={artist.external_urls.spotify}>
                                            <div style={{backgroundImage: `url(${artist.images[0].url})`, 
                                                height: '100%',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundPosition: 'center',
                                                backgroundSize: 'cover',
                                                display: 'grid',
                                                placeItems: 'center',
                                                height: '16rem',
                                                width: '16rem'}} className='h-full'>
                                                <p className="text-lg">{artist.name}</p>
                                            </div>
                                        </a> 
                                    </div>
                                )
                            })}
                        </div>
                        <div className="flex flex-row space-x-12 p-2">
                        <p className="underline mt-auto mb-auto text-2xl mr-24">Playlists ➜</p>
                        {playlists.map(playlist =>{
                            return(
                                <div>
                                    <a href={playlist.external_urls.spotify}>
                                        <div style={{backgroundImage: `url(${playlist.images[0].url})`, 
                                            height: '100%',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            display: 'grid',
                                            placeItems: 'center',
                                            height: '16rem',
                                            width: '16rem'}} className='h-full'>
                                            <p className="text-lg">{playlist.name}</p>
                                        </div>
                                    </a> 
                                </div>
                            )
                        })}
                        </div>
                        <div className="flex flex-row space-x-12 p-2">
                        <p className="underline mt-auto mb-auto text-2xl mr-24">Shows ➜</p>
                        {shows.map(show =>{
                            return(
                                <div>
                                    <a href={show.external_urls.spotify}>
                                        <div style={{backgroundImage: `url(${show.images[0].url})`, 
                                            height: '100%',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            display: 'grid',
                                            placeItems: 'center',
                                            height: '16rem',
                                            width: '16rem'}} className='h-full'>
                                            <p className="text-lg">{show.name}</p>
                                        </div>
                                    </a> 
                                </div>
                            )
                        })}
                        </div>
                </div> 
                ) 
            }
        </div>
    );
}

export default Dashboard;

const styles = {
    image: {
        height: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        display: 'grid',
        placeItems: 'center',
        height: '16rem',
        width: '16rem'
    }
}
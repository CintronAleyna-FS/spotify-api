import React, { useEffect, useState } from 'react';

import whiteSpotifyLogo from '../images/spotify-white-logo.png'
// BsSpotify
const MyNav = ({code}) => {

  
    return(
        <nav style={styles.nav} className='pl-4 flex'>
            <img src={whiteSpotifyLogo} className=''></img>
            {
            code
            ? <input 
            style={styles.searchBar}
            className='search-bar m-auto p-2 w-4/12'
            placeholder="Search for artist..."
            // value={search}
            // onChange={e => setSearch(e.target.value)}
            // onKeyPress={handleKeyPress}
            />
            : <p className="m-auto"></p>
            }
        </nav>
    )
}
export default MyNav;

const styles = {
    nav: {
        fontSize: '1.5rem',
        width:'100%',
        textDecoration: 'none',
        backgroundColor: '#1eb855',
        boxShadow:" 0 2px 2px -2px rgba(0,0,0,.2)",
        padding: '.5rem'
    },
    searchBar: {
      background: 'rgba(0, 0, 0, 0)',
      color: 'white',
      outline: 'none',
      borderBottom: '2px solid white',
      lineHeight: '0px',
    }
}
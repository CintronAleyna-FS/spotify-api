import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BsSpotify } from 'react-icons/bs'
import { FaSearch } from 'react-icons/fa'

const MyNav = ({code, handleKeyPress, handleChange, search}) => {
  
  return(
      <nav style={styles.nav} className='pl-4 flex h-20'>
            <BsSpotify size={50} className="mt-auto mb-auto"></BsSpotify>            
            {
            code
            ? 
            <div className='search-bar m-auto w-5/12'>
              <FaSearch size={32} className="inline p-1 mr-2"/>
              <input
                style={styles.searchBar}
                className='search-bar m-auto p-1 w-11/12'
                placeholder="Search for artist..."
                value={search}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
              />
            </div>
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
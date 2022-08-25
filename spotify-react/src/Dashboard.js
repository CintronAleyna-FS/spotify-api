import axios from 'axios';
import React, { useState, useEffect } from 'react';
import useAuth from './useAuth';

function Dashboard({code}) {
    const accessToken = useAuth(code)
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState("")

    const handleKeyPress = (e) => {
        if(e.key === 'Enter'){
            if(!search) return
            else{
            axios.post('http://localhost:3001/search', {
            search
            }).then (res => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
            }
        }
    }
    return (
        <div>
            <p style={styles.p}>Authorized</p>
            <div>
                <input 
                    placeholder="Search"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
            </div>
        </div>
    );
}

export default Dashboard;

const styles = {
    p: {
        padding:'1rem'
    }
}
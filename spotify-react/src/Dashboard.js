import axios from 'axios';
import React, { useState, useEffect } from 'react';
import useAuth from './useAuth';

function Dashboard({code}) {
    const accessToken = useAuth(code)
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState("")

    let ignore = false;
    useEffect(() => {
        if(!search) return
        if(!ignore){
            axios.post('http://localhost:3001/search', {
            search
            }).then (res => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
        }
        return () => {
            ignore = true;
        }
    }, [search]) 
    return (
        <div>
            <p style={styles.p}>Authorized</p>
            <div>
                <input 
                    placeholder="Search"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
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
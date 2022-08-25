import React, { useEffect, useState } from 'react';
import axios from 'axios'

function useAuth(code) {

    let ignore = false;
    useEffect(() => {
        if(!ignore){
            axios.post('http://localhost:3001/login', {
            code
            }).then (res => {
                console.log(res.data)
            }).catch((err) => {
                window.location ='/'
            })
        }
        return () => {
            ignore = true;
        }
    }, [code])
}

export default useAuth;


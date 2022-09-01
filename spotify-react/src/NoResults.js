import React, { useState, useEffect } from 'react';
import { BsSpotify } from 'react-icons/bs'

function NoResults() {

    return (
        <div>
            <div className="flex justify-center h-screen items-center flex-col">
                <BsSpotify size={40} color="#1cb955" className="mb-1"></BsSpotify>
                <p className="mb-4 text-xl font-bold">No Results</p>
                <p className="mb-6 text-center">Please type in a search query to get started...</p>
            </div>
        </div>
    );
}

export default NoResults;

const styles = {
    p: {
        padding:'1rem'
    }
}
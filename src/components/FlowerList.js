import React from 'react';
import Navbar from './Navbar';
import GetFlowers from './GetFlowers';

function FlowerList() {
    return (
        <div className='main-container'>
            <Navbar />
            <GetFlowers />
        </div>
    );
}

export default FlowerList;
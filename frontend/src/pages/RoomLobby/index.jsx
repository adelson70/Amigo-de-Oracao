import React, { use, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const RoomLobby = () => {
    
    const acessRoom = (token) => {
        console.log('Acessando a sala com o token:', token);
    }

    const handleChange = (event) => {
        const inputToken = event.target.value;

        if (/^[a-zA-Z]{0,6}$/.test(inputToken)) {
            if (inputToken.length === 6) {
                acessRoom(inputToken);
            }
        }

    }


    return (
        <div className='container'>
            <h1 className='titulo'>Digite o TOKEN da sala de oração</h1>
            <input type="text" className='token' maxLength={6} onChange={handleChange} />
        </div>
    );
}

export default RoomLobby;

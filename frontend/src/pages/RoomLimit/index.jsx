import React from 'react';
import ButtonComponent from '../../components/ButtonComponent';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './styles.css';


const RoomLimit = () => {
    const { room } = useParams();
    const navigate = useNavigate();
    const handleClick = () => navigate('/');

    return (
        <div className='container'>
            <h1 className='titulo'>Oops!</h1>
            <p className='descricao'>
                A sala "<strong>{room}</strong>" atingiu o limite máximo de participantes!
            </p>
            <ButtonComponent background='#6FA600' description='Voltar' clickHandler={handleClick} />
        </div>
    );
}

export default RoomLimit;

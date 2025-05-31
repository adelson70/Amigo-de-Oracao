import React from 'react';
import ButtonComponent from '../../components/ButtonComponent';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const NotFound = () => {
  const navigate = useNavigate();

  const handleClick = () => navigate('/');

  return (
    <div className='container'>
      <h1 className='titulo'>Oops!</h1>
      <p className='descricao'>Página não encontrada!</p>
      <ButtonComponent background='#6FA600' description='Voltar' clickHandler={handleClick} />
    </div>
  );
}

export default NotFound;

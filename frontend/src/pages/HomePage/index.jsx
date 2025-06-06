import React, {use, useEffect} from 'react';
import './styles.css';
import ButtonHomeComponent from '../../components/ButtonHomeComponent/index';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../context/SocketContext';

const HomePage = () => {
  const socket = useSocket();
  const navigate = useNavigate();

  const handleClickButton = (action) => {
    switch(action) {
      case 'ENTER':
        
      socket.emit('mensagem', { mensagem: 'ping' });
      socket.on('resposta', (data) => {
        console.log('Resposta do servidor:', data.message);
      });

        navigate('/room/lobby');
        break;
      case 'CREATE':
        navigate('/dashboard');
        break;
      default:
        console.error('Ação desconhecida:', action);
    }
  }

  return(
    <div>
      <h1 className='titulo'>Bem-vindo ao Amigo de Oração!</h1>
      <div className='buttons-container'>
        <ButtonHomeComponent description='Entrar em uma Sala' clickHandler={() => handleClickButton('ENTER')}/>
        <ButtonHomeComponent description='Criar uma Sala' clickHandler={()=> handleClickButton('CREATE')}/>
      </div>
    </div>
  )
};

export default HomePage;

import React, { useState } from 'react';
import { useNavigate, useLoaderData } from 'react-router-dom';
import { enterSala, verifyTokenSala } from '../../services/sala';
import { toast } from 'react-toastify';
import ButtonComponent from '../../components/ButtonComponent';
import { MoonLoader } from 'react-spinners';
import { useSocket } from '../../context/SocketContext';
import './styles.css';

const RoomLobby = () => {
    const navigate = useNavigate();
    const loaderData = useLoaderData();
    const [token, setToken] = useState(loaderData.token || '');
    const [nome, setNome] = useState(loaderData.nome || '');
    const [waiting, setWaiting] = useState(loaderData.waiting || false);
    const [sorteado, setSorteado] = useState(loaderData.sorteado || false);
    const [amigo, setAmigo] = useState(loaderData.amigo || null);
    const Socket = useSocket();

    Socket.on('sorteioRealizado', (data) => {
        setAmigo(data[nome])
        setSorteado(true);
        setWaiting(false);
    })

    const handleChange = (event) => {
        const inputToken = event.target.value;

        if (/^[a-zA-Z]{0,6}$/.test(inputToken)) {
            if (inputToken.length === 6) {
                checkSalaToken(inputToken);
            }
        }
    }

    const checkSalaToken = async (salaToken) => {

        if (salaToken) {
            const response = await verifyTokenSala(salaToken);
            const statusSala = response.message;

            switch (statusSala) {
                case 'aberta':
                    setToken(salaToken);
                    break;
                case 'limite_excedido':
                    toast.warning(`Sala do token ${salaToken.toUpperCase()} está com o limite de participantes máximo!`);
                    setToken('');
                    setNome('');
                    setWaiting(false);
                    navigate('/room/lobby');
                    break;
                case 'fechada':
                    toast.warning(`Sala do token ${salaToken.toUpperCase()} está fechada!`);
                    navigate('/room/lobby');
                    break;
                case 'sala_nao_existe':
                    toast.warning(`Sala do token ${salaToken.toUpperCase()} não existe!`);
                    break;
                default:
                    toast.error('Token inválido. Você será redirecionado para o lobby.');
                    navigate('/room/lobby');
            }
        }
    };

    const handleEnterRoom = async (token) => {
        if (!nome) {
            toast.error('Por favor, digite seu nome para entrar na sala.');
            return;
        }

        try {
            const response = await enterSala({ token, nome });

            if (response.message === 'participante_existe') {
                toast.warning('Este nome já está sendo usado na sala. Por favor, escolha outro nome.');
                return
            }

            setWaiting(true);

            Socket.emit('entrar_sala', { token, nome });

        } catch (error) {
            console.error('Erro ao entrar na sala:', error);
            toast.error('Ocorreu um erro ao tentar entrar na sala.');
        }
    }

    return (
        <div className='container'>
            {sorteado ? (
                <>
                    <div className='sorteio-container'>
                        <h1 className='sorteio-amigo'>{amigo}</h1>
                        <h1 className='sorteio'>é a pessoa por quem você estará em oração</h1>
                    </div>
                </>
            ) : waiting ? (
                <>
                    <h1 className='titulo'>Aguardando Sorteio</h1>
                    <MoonLoader
                        color="#003366"
                        speedMultiplier={0.32}
                        size={100}
                    />
                </>
            ) : token ? (
                <>
                    <h1 className='titulo'>Digite seu nome para entrar na sala</h1>
                    <input
                        type="text"
                        className='nome'
                        placeholder="Seu nome"
                        maxLength={18}
                        onChange={(e) => { setNome(e.target.value.toUpperCase()) }}
                    />
                    <div className='button-container'>
                        <ButtonComponent
                            description='Entrar'
                            background='#6FA600'
                            clickHandler={() => { handleEnterRoom(token) }}
                        />
                    </div>
                </>
            ) : (
                <>
                    <h1 className='titulo'>Digite o TOKEN da sala de oração</h1>
                    <input
                        type="text"
                        className='token'
                        maxLength={6}
                        onChange={handleChange}
                    />
                </>
            )}
        </div>
    );
}

export default RoomLobby;

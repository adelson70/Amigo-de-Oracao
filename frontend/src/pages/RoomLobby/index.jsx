import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { verifyTokenSala, enterSala, isParticipante } from '../../services/sala';
import { toast } from 'react-toastify';
import ButtonComponent from '../../components/ButtonComponent';
import { FadeLoader, MoonLoader } from 'react-spinners';
import { useSocket } from '../../context/SocketContext';
import './styles.css';


const RoomLobby = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [token, setToken] = useState(params.room || '');
    const [nome, setNome] = useState('');
    const [waiting, setWaiting] = useState(false);
    const [sorteado, setSorteado] = useState(false);
    const [amigo, setAmigo] = useState(null);
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

    const checkIfParticipante = async () => {
        try {
            const response = await isParticipante();

            if (response.isParticipante) {
                setNome(response.participante.nome);
                setToken(response.participante.salaToken);
                setWaiting(true);
                Socket.emit('entrar_sala', { token: response.participante.salaToken, nome: response.participante.nome });
                return true;

            } else if (response.isSorteado) {
                setSorteado(true);
                setAmigo(response.sorteio.nome_amigo);
                setWaiting(false);
                return

            } else {
                setWaiting(false);
                return false
            }

        } catch (error) {
            console.error('Erro ao verificar se é participante:', error);
            toast.error('Ocorreu um erro ao verificar sua participação na sala.');
        }
    }

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

    useEffect(() => {
        const check = async () => {
            const isParticipanteResult = await checkIfParticipante();
            if (isParticipanteResult === false) {
                if (!!token) checkSalaToken(token);
            }
        };
        check();
    }, []);

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

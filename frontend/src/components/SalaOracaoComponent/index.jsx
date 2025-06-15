import React from "react";
import ButtonComponent from "../ButtonComponent";
import { useSocket } from "../../context/SocketContext";
import { listarParticipantes } from "../../services/sala";
import { toast } from "react-toastify";
import './styles.css';


const SalaOracaoComponent = ({ salaData, onClose, onSortear }) => {
    const Socket = useSocket();
    const participantsId = `sala-oracao-participantes-${salaData.token}`;
    const buscarParticipantes = async () => {
        try {
            const nomeParticipantes = await listarParticipantes(salaData.token);

            if (!nomeParticipantes || nomeParticipantes.length === 0) {
                const participantesDiv = document.getElementById(participantsId);
                if (participantesDiv) {
                    participantesDiv.innerHTML = '<div class="sala-oracao-participante">Nenhum participante encontrado.</div>';
                }
                return;
            }
            
            const participantesDiv = document.getElementById(participantsId);
            participantesDiv.innerHTML = '';

            for (const participante of nomeParticipantes) {
                if (participante === 'ADMIN') continue;
                if (participantesDiv) {
                    const participanteDiv = document.createElement('div');
                    participanteDiv.className = 'sala-oracao-participante';
                    participanteDiv.innerHTML = `<span>${participante}</span>`;
                    participantesDiv.appendChild(participanteDiv);
                }
            }


        } catch (error) {
            toast.error("Erro ao listar participantes. Tente novamente mais tarde.");
            console.error("Erro ao listar participantes:", error);
        }
    }

    buscarParticipantes()

    Socket.on('participanteEntrou', (data) => {
        if (data.nome === 'ADMIN') return; // Ignora o participante ADMIN

        const nome = data.nome;
        const participantesDiv = document.getElementById(participantsId);
        if (participantesDiv.innerHTML.includes(('Nenhum participante encontrado.'))) {
            participantesDiv.innerHTML = ''; // Limpa a mensagem de nenhum participante encontrado
        }

        if (participantesDiv) {
            // Verifica se o nome já está presente na lista
            const jaExiste = Array.from(participantesDiv.children).some(child =>
                child.textContent === nome
            );
            if (!jaExiste) {
                const participanteDiv = document.createElement('div');
                participanteDiv.className = 'sala-oracao-participante';
                participanteDiv.innerHTML = `<span>${nome}</span>`;
                participantesDiv.appendChild(participanteDiv);
            }
        }
    })

    return (
        <div className="modal-overlay">
            <div className="modal-content sala-oracao-modal">
                <button
                    className="close-modal-btn"
                    onClick={onClose}
                    aria-label="Fechar modal"
                >
                    &times;
                </button>

                <h1>Sala de Oração "{salaData.nome}"</h1>

                <img
                    src={salaData.qrCodeUrl}
                    alt="Sala de Oração"
                    className="sala-oracao-image"
                />

                <h2>Participantes</h2>

                <div id={participantsId} className="sala-oracao-participantes">
                    {salaData.participantes && salaData.participantes.map((participante, index) => (
                        <div key={index} className="sala-oracao-participante">
                            <span>{participante.nome}</span>
                        </div>
                    ))}
                </div>

                <div className="sala-oracao-actions">
                    <ButtonComponent
                        description="Sortear"
                        clickHandler={onSortear}
                        background="#6FA600"
                    />
                </div>

            </div>
        </div>
    );
}
export default SalaOracaoComponent;
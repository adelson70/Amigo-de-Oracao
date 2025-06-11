import React from "react";
import ButtonComponent from "../ButtonComponent";
import './styles.css';

const SalaOracaoComponent = ({ salaData, onClose, onSortear }) => {
    const participantsId = `sala-oracao-participantes-${salaData.token}`;

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
                    {salaData.participantes && salaData.participantes.length > 0 ? (
                        salaData.participantes.map((participante, index) => (
                            <div key={index} className="sala-oracao-participante">
                                <span>{participante.nome}</span>
                            </div>
                        ))
                    ) : (
                        <p>Nenhum participante na sala.</p>
                    )}
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
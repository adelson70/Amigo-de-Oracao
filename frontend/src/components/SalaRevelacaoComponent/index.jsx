import './styles.css';

const SalaRevelacaoComponent = ({ salaData, onClose }) => {
    return (
        <div className="modal-sala-revelacao-overlay">
            <div className="modal-sala-revelacao-content sala-revelacao-modal">
                <div className='modal-sala-revelacao-header'>
                    <h2>Revelação do Amigo Secreto</h2>
                    <button
                        className="modal-sala-revelacao-close-modal-btn"
                        onClick={onClose}
                        aria-label="Fechar modal"
                    >
                        &times;
                    </button>
                </div>
                <div className='modal-sala-revelacao-body'>
                <ul>
                    {salaData.map((par, idx) => (
                        <li key={idx}>
                            <strong>{par.meu_nome}</strong> tirou <strong>{par.nome_amigo}</strong>
                        </li>
                    ))}
                </ul>
                </div>
            </div>
        </div>
    );
}

export default SalaRevelacaoComponent;
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './styles.css';


const RecoveryPassword = () => {
    const { token } = useParams();
  return (
    <div className="recovery-password-container">
      <h1>Recuperação de Senha</h1>
      { token }
      <p>Instruções para recuperação de senha serão enviadas para o seu e-mail.</p>
      {/* Aqui você pode adicionar um formulário ou outras instruções */}
    </div>
  );
}

export default RecoveryPassword;
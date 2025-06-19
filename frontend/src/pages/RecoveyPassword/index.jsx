import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';


const RecoveryPassword = () => {
  return (
    <div className="recovery-password-container">
      <h1>Recuperação de Senha</h1>
      <p>Instruções para recuperação de senha serão enviadas para o seu e-mail.</p>
      {/* Aqui você pode adicionar um formulário ou outras instruções */}
    </div>
  );
}

export default RecoveryPassword;
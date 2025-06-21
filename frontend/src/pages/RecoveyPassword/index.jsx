import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './styles.css';
import ButtonComponent from '../../components/ButtonComponent';
import { toast } from 'react-toastify';
import { RedefinirSenha, TokenRecuperacaoIsValid } from '../../services/usuario';


const RecoveryPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRedefinirSenha = async () => {
    // verifica se tem token
    if (!token) {
      toast.error('Token Ausente. Por favor, solicite uma nova recuperação de senha.');
      return;
    }

    // verifica a validade do token
    const isValidToken = await TokenRecuperacaoIsValid(token);

    if (!isValidToken.message === 'Token_is_valid') {
      toast.error('Token inválido ou expirado. Por favor, solicite uma nova recuperação de senha.');
      return;
    }

    // verifica se as senhas são iguais
    if (newPassword !== confirmPassword) {
      toast.error('As senhas não coincidem. Por favor, tente novamente.');
      return;
    }

    // verifica se a senha é válida
    if (newPassword.length < 6 ) {
      toast.error('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    // redefinir a senha
    const response = await RedefinirSenha(token, newPassword)

    if (response.status === 200) {
      toast.success(response.message || 'Senha redefinida com sucesso!');
      setNewPassword('');
      setConfirmPassword('');
      navigate('/login');
    }
  }

  return (
    <div className="recovery-password-container">
      <h1>Amigo de Oração</h1>
      <div className="form-group">
        <label htmlFor="new-password">Nova Senha:</label>
        <input type="password" id="new-password" name="new-password" required onChange={e => setNewPassword(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="confirm-password">Confirmar Senha:</label>
        <input type="password" id="confirm-password" name="confirm-password" required onChange={e => setConfirmPassword(e.target.value)} />
      </div>
      <div className="form-group">
        <ButtonComponent description='Redefinir Senha' background='#4CAF50' clickHandler={handleRedefinirSenha} />
      </div>
    </div>
  );
}

export default RecoveryPassword;
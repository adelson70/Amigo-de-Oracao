import React, { useState, useEffect } from "react";
import ButtonComponent from "../../components/ButtonComponent";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = () => {
    // Aqui você pode adicionar a lógica de autenticação
    console.log('Usuário:', username);
    console.log('Senha:', password);
    
    // verifica se um dos campos está vazio
    if (!username || !password) {
      toast.warning('Por favor, preencha todos os campos.');
      return;
    }

  }

  return (
    <div className="login-page">

      <h1 className="login-title">Área de Login</h1>

      <div className="login-container">

        <div className="form-group">
          <label htmlFor="username">Usuário</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite seu usuário"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            className="form-control"
          />
        </div>

        <div className="login-footer">
          <ButtonComponent description="Entrar" background="#6FA600" clickHandler={handleLogin} />

          <div className="login-links">
            <p>Não tem uma conta? <a href="/register">Registrar</a></p>
            <p><a href="/forgot-password">Esqueci minha senha</a></p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default LoginPage;
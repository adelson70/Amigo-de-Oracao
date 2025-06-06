import React, { useState, useEffect } from "react";
import ButtonComponent from "../../components/ButtonComponent";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';
import { Login } from "../../services/usuario";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  console.log('LoginPage Renderizada');

  const navigate = useNavigate();
  
  const handleLogin = async () => {
    // Aqui você pode adicionar a lógica de autenticação
    console.log('Usuário:', usuario);
    console.log('Senha:', senha);
    
    // verifica se um dos campos está vazio
    if (!usuario || !senha) {
      toast.warning('Por favor, preencha todos os campos.');
      return;
    }

    await Login(usuario, senha)
      .then(response => {
        if (response.status === 200) {
          toast.success('Login realizado com sucesso!'); 
          localStorage.setItem('isLoggedIn', 'true');
          navigate('/dashboard');
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          return toast.error('Usuário ou senha inválidos.');
        }
        return toast.error('Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.');
      });



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
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            placeholder="Digite seu usuário"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
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
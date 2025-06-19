import React, { useState } from "react";
import ButtonComponent from "../../components/ButtonComponent";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';
import { EsqueciMinhaSenha, Login } from "../../services/usuario";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [modalRegistrar, setModalRegistrar] = useState(false);
  const navigate = useNavigate();
  

  
  const handleLogin = async () => {
    
    // verifica se um dos campos está vazio
    if (!email || !senha) {
      toast.warning('Por favor, preencha todos os campos.');
      return;
    }

    await Login(email, senha)
      .then(response => {
        if (response.status === 200) {
          toast.success('Login realizado com sucesso!'); 
          navigate('/dashboard');
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          return toast.error('E-mail ou senha inválidos.');
        }
        return toast.error('Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.');
      });



  }

  const validateEmail = (email) => {
    // Regex simples para validação de e-mail
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailBlur = () => {
    if (email && !validateEmail(email)) {
      toast.error('Por favor, insira um e-mail válido.');
    } 
    
  };

  const handleSenhaEsquecida = async () => {
    if (!email) {
      toast.warning('Por favor, insira seu e-mail para recuperação de senha.');
      return;
    }
    if (!validateEmail(email)) {
      toast.error('Por favor, insira um e-mail válido para recuperação de senha.');
      return;
    }

    const response = await EsqueciMinhaSenha(email);

    toast.info(response.message);
  }

  return (
    <div className="login-page">

      <h1 className="login-title">Área de Login</h1>

      <div className="login-container">

        <div className="form-group">
          <label htmlFor="username">E-mail</label>
          <input
            type="text"
            id="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleEmailBlur}
            placeholder="Digite seu e-mail"
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
            <p><a style={{ cursor: 'pointer' }} onClick={handleSenhaEsquecida}>Esqueci minha senha</a></p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default LoginPage;
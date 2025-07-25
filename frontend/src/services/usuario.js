import { toast } from "react-toastify";
import api from "./api";

export async function Login(email, senha) {
    const reponse = await api.post('/usuario/login', {
        email,
        senha,
    });
    return reponse
}

export async function Me() {
    const response = await api.get('/usuario/me');
    return response;
}

export async function Logout() {
    const response = await api.post('/usuario/logout');
    return response;
}

export async function Info() {
    const response = await api.get('/usuario/info');
    return response.data
}

export async function UpdateUsuario(senha) {
    const response = await api.put('/usuario/update', {
        senha
    });
    return response.data;
}

export async function EsqueciMinhaSenha(email) {
    const response = await api.post('/usuario/esqueci-minha-senha', {
        email
    });
    return response.data;
}

export async function RecuperarSenha(token, senha) {
    const response = await api.post(`/usuario/esqueci-minha-senha/${token}`, {
        senha
    });
    return response.data;
}

export async function TokenRecuperacaoIsValid(token) {
    const response = await api.get(`/usuario/esqueci-minha-senha/${token}`);
    return response.data;
}

export async function RedefinirSenha(token, senha) {
    const response = await api.post(`/usuario/esqueci-minha-senha/${token}`, {
        senha
    });
    return response.data;
}

export async function Registrar(params) {
    try {
        const response = await api.post('/usuario/register', params);
        return response.data;
    } catch (error) {
        toast.error(error.response?.data?.error || 'Erro ao registrar usuário');
        throw error;
    }
}
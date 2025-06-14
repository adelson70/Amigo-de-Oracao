import api from "./api";

export async function Login(usuario, senha) {
    const reponse = await api.post('/usuario/login', {
        nome: usuario,
        senha,
    });
    return reponse
}

export async function Me() {
    const response = await api.get('/usuario/me');
    return response;
}
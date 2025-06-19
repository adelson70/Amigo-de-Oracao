import { redirect } from "react-router-dom";
import { RecuperarSenha } from "../../services/usuario";

export async function verifyTokenRecoveryLoader({ params }) {
    const { token } = params;

    if (!token) return redirect('/login');

    try {
        const response = await RecuperarSenha(token, '');

        if (response.status === 200) return true;

        else return redirect('/login');
        
    } catch (error) {
        return redirect('/login?');
    }
}
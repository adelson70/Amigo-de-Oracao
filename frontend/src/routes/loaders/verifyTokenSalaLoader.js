import { redirect } from "react-router-dom";
import { isParticipante, verifyTokenSala } from "../../services/sala";

export async function verifyTokenSalaLoader({ params }) {
    const { room } = params;

    try {
        const response = await isParticipante();

        if (response.isParticipante) {
            return {
                nome: response.participante.nome,
                token: response.participante.salaToken,
                waiting: true,
                sorteado: false,
                amigo: null
            };
        }

        if (response.isSorteado) {
            return {
                nome: null,
                token: null,
                waiting: false,
                sorteado: true,
                amigo: response.sorteio.nome_amigo
            };
        }

        if (room) {
            const salaResponse = await verifyTokenSala(room);
            const statusSala = salaResponse.message;

            switch (statusSala) {
                case 'aberta':
                    return {
                        nome: null,
                        token: room,
                        waiting: false,
                        sorteado: false,
                        amigo: null
                    };
                case 'limite_excedido':
                    return redirect('/room/lobby');
                case 'fechada':
                case 'sala_nao_existe':
                default:
                    return redirect('/room/lobby');
            }
        }

        return {
            nome: null,
            token: null,
            waiting: false,
            sorteado: false,
            amigo: null
        };
    } catch (error) {
        return redirect('/');
    }
}
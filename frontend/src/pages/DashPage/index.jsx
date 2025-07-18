import './styles.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSalas, createSala, deleteSala, getQrCodeSala, sortearParticipante, revelacaoParticipante } from "../../services/sala";
import ButtonComponent from "../../components/ButtonComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash, faShare, faUsers } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';
import { toast } from "react-toastify";
import SalaOracaoComponent from "../../components/SalaOracaoComponent";
import SalaRevelacaoComponent from "../../components/SalaRevelacaoComponent";
import { useSocket } from "../../context/SocketContext";
import ProfileComponent from '../../components/ProfileComponent';
import { Info, Logout, UpdateUsuario } from '../../services/usuario';

const DashPage = () => {
  const [salas, setSalas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [salasFiltradas, setSalasFiltradas] = useState("");
  const [modalSalaOracao, setModalSalaOracao] = useState(false);
  const [modalSalaRevelacao, setModalSalaRevelacao] = useState(false);
  const [salaOracao, setSalaOracao] = useState({ nome: "", qrCodeUrl: "", token: "" });
  const [salaRevelacao, setSalaRevelacao] = useState(null);
  const Socket = useSocket();

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_ROUTE;

  const handleCreateSala = async () => {
    const { value } = await Swal.fire({
      title: 'Criar Sala',
      html: `
      <label for="swal-input-nome" style="display:block;text-align:center;margin-bottom:2px;">Nome da Sala</label>
      <input id="swal-input-nome" class="swal2-input" placeholder="Nome da Sala" type="text" style="margin-bottom:10px; text-align:center;" maxlength="30">
      <label for="swal-input-limite" style="display:block;text-align:center;margin-bottom:2px; padding-top:22px">Limite de Participantes (3-30)</label>
      <input id="swal-input-limite" class="swal2-input" placeholder="Limite de Participantes (3-30)" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2" style="text-align:center;">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonColor: '#6FA600',
      cancelButtonColor: '#B22222',
      confirmButtonText: 'Criar',
      cancelButtonText: 'Cancelar',

      didOpen: () => {
        const limiteInput = document.getElementById('swal-input-limite');
        if (limiteInput) {
          limiteInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
          });
        }
      },

      preConfirm: () => {
        const nome = document.getElementById('swal-input-nome').value;
        const limiteStr = document.getElementById('swal-input-limite').value;

        // Remove any non-digit characters
        const limiteClean = limiteStr.replace(/\D/g, '');
        const limite = Number(limiteClean);

        if (!nome || !limiteClean) {
          toast.warning('Por favor, preencha todos os campos.');
          return false;
        }

        if (!/^\d+$/.test(limiteClean) || limite < 3 || limite > 30) {
          toast.warning('O limite deve ser um número entre 3 e 30.');
          return false;
        }

        if (nome.length < 10 ){
          toast.warning('O nome da sala deve ter pelo menos 10 caracteres.');
          return false;
        }

        return { nome, limite };
      }
    });

    if (value) {
      try {
        await createSala({nome: value.nome, limite: value.limite});
        toast.success('Sala criada com sucesso!');
        fetchSalas();
      } catch (error) {
        toast.error('Erro ao criar sala. Tente novamente.');
        console.error("Error creating room:", error);
      }
    }
  }

  const handleDeleteSala = async (salaToken) => {

    const result = await Swal.fire({
      title: 'Tem certeza?',
      text: "Você não poderá reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6FA600',
      cancelButtonColor: '#B22222',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await deleteSala(salaToken);
        Swal.fire({
          title: 'Deletada!',
          text: 'A sala foi deletada.',
          icon: 'success',
          confirmButtonColor: '#6FA600'
        });
        fetchSalas();
      } catch (error) {
        Swal.fire('Erro!', 'Não foi possível deletar a sala.', 'error');
      }
    }

  }

  const handleShareSala = (sala) => {
    navigator.clipboard.writeText(`${API_URL}/room/lobby/${sala.token}`)
      .then(() => {
        toast.info(`Link da sala "${sala.nome}" copiado para a área de transferência!`);
      })
      .catch(() => {
        toast.error('Erro ao copiar o token. Tente novamente.');
      });
  }

  const fetchSalas = async () => {
    setLoading(true);
    try {
      const response = await getSalas();
      setSalas(response);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchTerm) => {
    if (!searchTerm) {
      setSalasFiltradas("");
      return;
    }
    const salasFiltradas = salas.filter(sala =>
      sala.nome.toLowerCase().includes(searchTerm) ||
      sala.token.toLowerCase().includes(searchTerm) ||
      sala.status.toLowerCase().includes(searchTerm) ||
      sala.createdAt.toLowerCase().includes(searchTerm)
    );

    setSalasFiltradas(salasFiltradas);
  };

  const handleOpenSalaOracao = () => {
    setModalSalaOracao(true);
  };
  
  const handleCloseSalaOracao = () => {
    setModalSalaOracao(false);
    Socket.emit("sair_sala", { token: salaOracao.token, nome: "ADMIN" });
    setSalaOracao({ nome: "", qrCodeUrl: "", token: "" });
  };

  const handleSalaOracaoData = async (nome, token) => {
    // const qrCodeUrl = await getQrCodeSala(token);

    // if (!qrCodeUrl) {
    //   toast.error("Erro ao obter QR Code da sala.");
    //   return;
    // }

    setSalaOracao({ nome, token });
    handleOpenSalaOracao();
    Socket.emit("entrar_sala", { token, nome: "ADMIN" });

  }

  const handleSortear = async () => {
    if (!salaOracao.token) {
      toast.error("Nenhuma sala selecionada para sortear.");
      return;
    }
    const response = await sortearParticipante(salaOracao.token)
    
    switch (response.status) {
      case 'quantidade_minima':
        toast.warning(response.message);
        return;
    }

    handleCloseSalaOracao();
    toast.info("Sorteio realizado com sucesso!");
    fetchSalas();
  }

  const handleRevelacao = async (token) => {
    const reponse = await revelacaoParticipante(token)
    setModalSalaRevelacao(true);
    setSalaRevelacao(reponse);
  }

  const handleProfileAction = async (action) => {
    switch (action) {
      case 'perfil':
        // abrir modal com email e senha para poder alterar
        const usuario = await Info()
        Swal.fire({
          title: 'Perfil',
          html: `
            <label for="swal-input-nome" style="display:block;text-align:center;margin-bottom:2px;">Nome</label>
            <input id="swal-input-nome" class="swal2-input" placeholder="Nome" type="text" style="margin-bottom:10px; text-align:center;" value="${usuario.nome}" maxlength="30" disabled>
            <label for="swal-input-senha" style="display:block;text-align:center;margin-bottom:2px; padding-top:22px">Senha</label>
            <input id="swal-input-senha" class="swal2-input" placeholder="Senha" type="password" style="text-align:center;">
          `,
          focusConfirm: false,
          showCancelButton: true,
          confirmButtonColor: '#6FA600',
          cancelButtonColor: '#B22222',
          confirmButtonText: 'Salvar',
          cancelButtonText: 'Cancelar',
          preConfirm: () => {
            const senha = document.getElementById('swal-input-senha').value;

            if (senha && senha.length < 7) {
              toast.warning('A senha deve ter pelo menos 7 caracteres.');
              return false;
            }

            return
          }
        }).then(async (result) => {
          if (result.isConfirmed) {
            const senha = document.getElementById('swal-input-senha').value;
            const response = await UpdateUsuario(senha);
            if (response) toast.info(response.message);
          }})
        break;
      case 'sair':
        Swal.fire({
          title: 'Sair',
          text: "Você tem certeza que deseja sair?",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#6FA600',
          cancelButtonColor: '#B22222',
          confirmButtonText: 'Sim, sair!',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            Logout().then(() => {
              navigate('/login');
            })
          }
        });
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    fetchSalas();
  }, []);

  return (
    <div className="dash-page">
      {/* ProfileComponent no canto superior direito */}
      <div style={{ position: "absolute", top: 20, right: 20, zIndex: 10 }}>
        <ProfileComponent onMenuClick={handleProfileAction} />
      </div>

      { modalSalaOracao && (
        <SalaOracaoComponent salaData={salaOracao} onClose={handleCloseSalaOracao} onSortear={handleSortear} />
      )}

      { modalSalaRevelacao && (
        <SalaRevelacaoComponent salaData={salaRevelacao} onClose={() => setModalSalaRevelacao(false)} />
      )}

      <div className="searchSala">
        <input
          type="text"
          placeholder="Pesquisar sala..."
          onChange={(e) => { handleSearch(e.target.value.toLowerCase()) }}
        />

        <ButtonComponent
          description="Criar Sala"
          clickHandler={handleCreateSala}
          background="#6FA600"
        />
      </div>

      {loading ? (
        <div className="loading">Carregando...</div>
      ) : (
        <div className="salas-table-container">
          <table className="salas-table">
            <thead>
              <tr>
                <th>Nome da Sala</th>
                <th>Token</th>
                <th>Data de Criação</th>
                <th>Limite de Participantes</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {(salasFiltradas ? salasFiltradas : salas).map((sala, idx) => (
                <tr key={sala.id || idx}>
                  <td>{sala.nome}</td>
                  <td>{sala.token}</td>
                  <td>{new Date(sala.createdAt).toLocaleDateString()}</td>
                  <td>{sala.limite}</td>
                  <td style={{
                    color: sala.status === "aberta" ? "#206A2C" : "#8B1C1C",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    textTransform: "capitalize"
                  }}>{sala.status}</td>
                  <td style={{ width: "20rem" }}>
                    <div style={{ display: "flex", gap: "0.7rem", justifyContent: "center", alignContent: "center" }}>
                      {sala.status === "aberta" ? (
                        <>
                          <ButtonComponent description={<FontAwesomeIcon icon={faUsers} size="lg" />} clickHandler={() => {handleSalaOracaoData(sala.nome, sala.token)}} popup="Entrar na Sala" background="#3cb371" />
                          <ButtonComponent description={<FontAwesomeIcon icon={faShare} size="lg" />} clickHandler={() => { handleShareSala(sala) }} popup="Compartilhar Sala" background="#0A4F9C" />
                          <ButtonComponent description={<FontAwesomeIcon icon={faTrash} size="lg " />} clickHandler={() => { handleDeleteSala(sala.token) }} popup="Deletar Sala" background="#b22222" />
                        </>
                      ) : (
                        <>
                          <ButtonComponent description={<FontAwesomeIcon icon={faEye} size="lg" />} clickHandler={() => { handleRevelacao(sala.token) }} popup="Visualizar Revelação" background="#778899" />
                          <ButtonComponent description={<FontAwesomeIcon icon={faTrash} size="lg" />} clickHandler={() => { handleDeleteSala(sala.token) }} popup="Deletar Sala" background="#b22222" />
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DashPage;
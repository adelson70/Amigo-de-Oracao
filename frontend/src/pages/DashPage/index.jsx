import React, { useState, useEffect, use } from "react";
import './styles.css';
import { useNavigate } from "react-router-dom";
import { getSalas, createSala, deleteSala } from "../../services/sala";
import ButtonComponent from "../../components/ButtonComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash, faShare, faUsers } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';


const DashPage = () => {
  const [salas, setSalas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [salasFiltradas, setSalasFiltradas] = useState("");

  const navigate = useNavigate();

  const handleDeleteSala = async (salaToken) => {
    console.log("Deletando sala com ID:", salaToken);
    
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

  const fetchSalas = async () => {
    setLoading(true);
    try {
      const response = await getSalas();
      setSalas(response);
      console.log("Salas fetched successfully:", response);
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

  useEffect(() => {
    fetchSalas();
  }, []);

  return (
    <div className="dash-page">

      <div className="searchSala">
        <input
          type="text"
          placeholder="Pesquisar sala..."
          onChange={(e) => { handleSearch(e.target.value.toLowerCase()) }}
        />

        <ButtonComponent
          description="Criar Sala"
          onClick={() => { }}
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
                  <td>{sala.status}</td>

                  <td style={{ width: "20rem" }}>
                    <div style={{ display: "flex", gap: "0.7rem", justifyContent: "center", alignContent: "center" }}>
                      {sala.status === "aberta" ? (
                        <>
                          <ButtonComponent description={<FontAwesomeIcon icon={faUsers} size="lg" />} clickHandler={() => { }} popup="Entrar na Sala" background="#3cb371" />
                          <ButtonComponent description={<FontAwesomeIcon icon={faShare} size="lg" />} clickHandler={() => { }}  popup="Compartilhar Sala"/>
                          <ButtonComponent description={<FontAwesomeIcon icon={faTrash} size="lg "/>} clickHandler={() => {handleDeleteSala(sala.token)}}  popup="Deletar Sala" background="#b22222"/>
                        </>
                      ) : (
                        <>
                          <ButtonComponent description={<FontAwesomeIcon icon={faEye} size="lg" />} clickHandler={() => { }} popup="Visualizar Revelação" background="#778899" />
                          <ButtonComponent description={<FontAwesomeIcon icon={faTrash} size="lg" />} clickHandler={() => {handleDeleteSala(sala.token)}} popup="Deletar Sala" background="#b22222"/>
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
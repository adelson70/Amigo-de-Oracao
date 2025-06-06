import React from "react";
import './styles.css';
import { useNavigate } from "react-router-dom";

const DashPage = () => {
  const navigate = useNavigate();

  const handleClickButton = (action) => {
    switch(action) {
      case 'CREATE':
        navigate('/login');
        break;
      default:
        console.error('Ação desconhecida:', action);
    }
  }

  return (
    <div className="dash-page">
      <h1 className="dash-title">Dashboard</h1>
      <div className="dash-container">
        <button className="dash-button" onClick={() => handleClickButton('CREATE')}>
          Criar Sala
        </button>
      </div>
    </div>
  );
}
export default DashPage;
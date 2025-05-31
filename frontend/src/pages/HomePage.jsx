import React, { useEffect, useState } from 'react';
import { useApi } from '../context/ApiContext';
import ExampleComponent from '../components/ExampleComponent';
import api from '../services/api';

const HomePage = () => {
  const [data, setData] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get('/example')
      setData(response.data.nome)
    }
    fetchData()
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <ExampleComponent />
      {data && 
        <p>Nome: {data}</p>
      }
    </div>
  );
};

export default HomePage;

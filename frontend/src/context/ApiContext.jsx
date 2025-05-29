import React, { createContext, useContext, useState } from 'react';
import api from '../services/api';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [data, setData] = useState(null);

  const fetchData = async (endpoint) => {
    const response = await api.get(endpoint);
    setData(response.data);
  };

  return (
    <ApiContext.Provider value={{ data, fetchData }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);

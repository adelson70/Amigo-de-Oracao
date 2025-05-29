import React, { useEffect } from 'react';
import { useApi } from '../context/ApiContext';
import ExampleComponent from '../components/ExampleComponent';

const HomePage = () => {
  const { data, fetchData } = useApi();

  useEffect(() => {
    fetchData('/example');
  }, [fetchData]);

  return (
    <div>
      <h1>Home Page</h1>
      <ExampleComponent />
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default HomePage;

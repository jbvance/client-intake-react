import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

axios.defaults.baseURL = 'http://____________';

export const useAxios = (axiosParams: any) => {
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState('');
  const [axiosLoading, setAxiosLoading] = useState(false);

  const fetchData = async (params: any) => {
    try {
      setAxiosLoading(true);
      const result = await axios.request(params);
      setResponse(result.data);
    } catch (error: any) {
      setError(error);
    } finally {
      setAxiosLoading(false);
    }
  };

  useEffect(() => {
    fetchData(axiosParams);
  }, []); // execute once only

  return { response, error, axiosLoading };
};

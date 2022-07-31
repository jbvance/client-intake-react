import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}`;

export const useAxios = () => {
  const [response, setResponse] = useState<any>(undefined);
  const [axiosError, setAxiosError] = useState('');
  const [axiosLoading, setAxiosLoading] = useState(false);

  const fetchData = async (params: any) => {
    try {
      setAxiosLoading(true);
      const result = await axios.request(params);
      setResponse(result.data);
    } catch (error: any) {
      console.log('ERROR', error);
      setAxiosError(error);
    } finally {
      setAxiosLoading(false);
    }
  };

  return { fetchData, response, axiosError, axiosLoading };
};

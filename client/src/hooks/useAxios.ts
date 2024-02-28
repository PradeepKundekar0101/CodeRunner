import axios from 'axios';
import { useAppSelector } from '../app/hooks';
const useAxios = () => {
  const token = useAppSelector((state) => {return state.auth.token});
  const instance = axios.create({
    baseURL:import.meta.env.VITE_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token || '',
    },
  });
  return instance;
};

export default useAxios;
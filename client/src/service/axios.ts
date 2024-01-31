import axios from 'axios'
import { useAppSelector } from '../app/hooks'
const token = useAppSelector((state)=>{return state.auth.token});
const api = axios.create({
    baseURL:import.meta.env.VITE_BASE_URL,
    headers:{
        "Authorization": token||''
    }
});
export default api;
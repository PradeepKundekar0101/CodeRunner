import axios from 'axios';
import { User } from '../types/user' 
import useAxios from '../hooks/useAxios';


const api = useAxios();

export const loginUser = async({email,password}:{email:string,password:string})=>{
        try {
            const {data} = await api.post(`user/login`,{email,password});
            return data.data;
        } catch (error:any) {
            throw new Error(error.response.data?error.response.data:'Something went wrong');
        }
    };
export const registerUser = async({email,password,user_name}:{email:string,password:string,user_name:string}):Promise<{user:User,token:string}>=>{
        try {
            const {data} = await axios.post(`user/register`,{email,password,user_name});
            return data.data;
        } catch (error:any) {
            throw new Error(error.response.data.message || 'Something went wrong, please try again later');
        }
    }

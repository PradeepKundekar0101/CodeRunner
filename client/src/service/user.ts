import axios from 'axios';
import { User } from '../types/user' 

const BASE_URL: string = import.meta.env.VITE_BASE_URL;
const UserService={
    loginUser : async({email,password}:{email:string,password:string}):Promise<{user:User,token:string}>=>{
        try {
            const {data} = await axios.post<{status:string,data:{user:User,token:string}}>(`${BASE_URL}user/login`,{email,password});
            return data.data;
        } catch (error:any) {
            throw new Error(error.response.data.message||'Something went wrong');
        }
    },
    registerUser : async({email,password,user_name}:{email:string,password:string,user_name:string}):Promise<{user:User,token:string}>=>{
        try {
            const {data} = await axios.post<{status:string,data:{user:User,token:string}}>(`${BASE_URL}user/register`,{email,password,user_name});
            return data.data;
        } catch (error:any) {
            throw new Error(error.response.data.message || 'Something went wrong, please try again later');
        }
    }
}
export {UserService}
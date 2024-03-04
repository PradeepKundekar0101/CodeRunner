import useAxios from '../hooks/useAxios';
import { User } from '../types/user';
const useAuthService = () => {
    const api = useAxios();
    const loginUser = async({email,password}:{email:string,password:string})=>{
        try {
            const {data} = await api.post(`user/login`,{email,password});
            return data.data;
        } catch (error:any) {
            throw new Error(error.response?error.response.data.message:error.message);
        }
    };
    const registerUser = async({email,password,user_name}:{email:string,password:string,user_name:string}):Promise<{user:User,token:string}>=>{
        try {
            const {data} = await api.post(`user/register`,{email,password,user_name});
            return data.data;
        } catch (error:any) {
            throw new Error(error.response?error.response.data.message:error.message);
        }
    }
   
    return { loginUser,registerUser };
};
export default useAuthService;

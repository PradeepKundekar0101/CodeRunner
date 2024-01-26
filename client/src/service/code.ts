import axios from 'axios';
import { Job } from '../types/code';
// import { User } from '../types/user' 

const BASE_URL: string = import.meta.env.VITE_BASE_URL;
const UserService={
    executeCode : async({ code, language, token }:{code:string,language:string,token:string})=>{
        try {
            const {data} = await axios.post<{status:string,data:{job:Job}}>(`${BASE_URL}/api/v1/code/execute`,{code,language},{headers:{"Authorization":token}});
            return data.data;
        } catch (error:any) {
            throw new Error(error.response.data.message||'Something went wrong');
        }
    },
    getStatus : async({jobId}:{jobId:string})=>{
        try {
            const {data} = await axios.post<{status:string,data:{}}>(`${BASE_URL}/api/v1/code/status`,{},{params:{jobId}});
            return data.data;
        } catch (error:any) {
            throw new Error(error.response.data.message || 'Something went wrong, please try again later');
        }
    }
}
export {UserService}
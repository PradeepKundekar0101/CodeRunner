import useAxios from '../hooks/useAxios';
const useCodeService = () => {
    const api = useAxios();
    const executeCode = async({ code, language }:{code:string,language:string})=>{
        try {
            const {data} = await api.post(`code/execute`,{code,language});
            return data.data;
        } catch (error:any) {
            throw new Error(error.response.data.message||'Something went wrong');
        }
    }
    const getStatus = async({jobId}:{jobId:string})=>{
        try {
            const {data} = await api.post(`code/status`,{},{params:{jobId}});
            return data.data;
        } catch (error:any) {
            throw new Error(error.response.data.message || 'Something went wrong, please try again later');
        }
    }
    const getAllFiles = async()=>{
        try {
            const {data} = await api.get(`code/user`);
            // console.log(data)
            return data.data.files;

        } catch (error:any) {
            throw new Error(error.response.data.message || 'Something went wrong, please try again later');
        }
    }
    const createFile = async({title}:{title:string})=>{
        try {
            const {data} = await api.post(`code/create`,{title});
            return data.data;
        } catch (error:any) {
            throw new Error(error.response.data.message || 'Something went wrong, please try again later');
        }
    }
   
    return { executeCode,getStatus,getAllFiles,createFile};
};
export default useCodeService;

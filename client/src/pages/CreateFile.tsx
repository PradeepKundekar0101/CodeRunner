
import { useState } from 'react'
import { useAppSelector } from '../app/hooks';
import { notify } from '../utils/notify';
import { useNavigate } from 'react-router-dom';
import useAxios from '../service/axios';
import { Toaster } from 'react-hot-toast';
const CreateFile = () => {
    const [title,setTitle] = useState<string>("");
    const token = useAppSelector((state)=>{return state.auth.token});
    const user = useAppSelector((state)=>{return state.auth.user});
    const navigate = useNavigate();
    const axios = useAxios();
    const handleCreateFile = async(e:any)=>{
      e.preventDefault();
        try {
          if(!token){
            notify("Not allowed",false);
            return;
          }
          if(title.length<=3){
            notify("Title is too short",false);
            return;
          }
            const response = await axios.post("/api/v1/code/create",{title});
            navigate(`/sandbox/${user?._id}/${response.data.data.sandBox._id}`);
        } catch (error:any) {
         notify(error.message,false);
        }
    }
  return (
    <div className='h-[80vh] bg-black flex justify-center items-center '>
      <Toaster/>
        <div>
            <form className='flex flex-col border-slate-500 border-2 px-10 py-10 rounded-xl space-y-2' onSubmit={handleCreateFile}>
                <input
                  className='px-5 py-3  w-96 rounded-md'
                  type="text" placeholder='Enter the Title' value={title} onChange={(e)=>{setTitle(e.target.value)}}/>

                <input 
                  type="submit" value="Let's Go" className='inline-flex items-center w-full px-5 py-3 mb-3 mr-1 text-base font-semibold text-white no-underline align-middle bg-blue-600 border border-transparent border-solid rounded-md cursor-pointer select-none sm:mb-0 sm:w-auto hover:bg-blue-700 hover:border-blue-700 hover:text-white focus-within:bg-blue-700 focus-within:border-blue-700'/>
            </form>
        </div>
    </div>
  )
}

export default CreateFile
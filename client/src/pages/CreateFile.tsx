import axios from 'axios';
import { useState } from 'react'
import { useAppSelector } from '../app/hooks';
import { notify } from '../utils/notify';
import { useNavigate } from 'react-router-dom';
const CreateFile = () => {
    const [title,setTitle] = useState<string>("");
    const token = useAppSelector((state)=>{return state.auth.token});
    const user = useAppSelector((state)=>{return state.auth.user});
    const navigate = useNavigate();
    const handleCreateFile = async(e:any)=>{
      e.preventDefault();
        try {
          if(!token){
            notify("Not allowed",false);
            return;
          }
            const response = await axios.post("http://localhost:8000/api/v1/code/create",{title},{headers:{
              "Authorization":token
            }});
            navigate(`/sandbox/${user?._id}/${response.data.data.sandBox._id}`);
        } catch (error:any) {
         notify(error.message,false);
        }
    }
  return (
    <div className='h-[80vh] bg-black flex justify-center items-center '>
        <div>
            <form onSubmit={handleCreateFile}>
                <input
                  className=''
                 type="text" placeholder='Enter the Title' value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
                <input 
                
                type="submit" value="Let's Go" className='bg-green-400'/>
            </form>
        </div>
    </div>
  )
}

export default CreateFile
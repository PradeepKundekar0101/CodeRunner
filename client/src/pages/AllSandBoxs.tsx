import axios from 'axios'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../app/hooks';

const AllSandBoxs = () => {
  const {userId} = useParams();
  const token = useAppSelector((state)=>{return state.auth.token});

  const fetchAllFiles = async()=>{
    try {
      console.log("first")
      if(!token){
        return;
      }
      const response = await axios.get(`http://localhost:8000/api/code/user/${userId}`,{headers:{"Authorization":token}});
      console.log(response)
    } catch (error) {
      console.log(error)
    }
    useEffect(() => {
      fetchAllFiles();

    }, [])
    
  }
  return (
    <div>AllSandBoxs</div>
  )
}

export default AllSandBoxs
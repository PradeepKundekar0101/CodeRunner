import { File } from '../types/code'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'

const FileBox= ({
    _id,title,language
}:Partial<File>) => {
    const user = useAppSelector((state)=>{return state.auth.user});
    const getImageSrc = (language: string) => {
      return `${language.toLowerCase()}.png`;
    };
    if(!user){
        return<h1>Not Allowed</h1>;
    }
  return (
    <div className='bg-gray-900 border-slate-800 border-2 text-white px-3 py-10 rounded-md'>
        <h1 className='font-bold text-xl'>{title}</h1>
        <div className='my-2'>
          <div className='flex items-center space-x-1 py-1 '>
          <h2> 
          {language}</h2>
          {language?.length!==0 &&  <img
          alt='logo'
          src={getImageSrc(language||'')}
          style={{ maxWidth: '30px', maxHeight: '30px' }} // Adjust the size as needed
        />} 
          </div>
        
        </div>
        
        <Link className='bg-blue-500 px-5 py-2 rounded-sm' to={`/sandbox/${user?._id}/${_id}`}>Open</Link>
    </div>
  )
}

export default FileBox
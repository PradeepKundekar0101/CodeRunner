import React from 'react'
import { File } from '../types/code'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { notify } from '../utils/notify'

const FileBox= ({
    _id,title,language
}:Partial<File>) => {
    const user = useAppSelector((state)=>{return state.auth.user});
    if(!user){
        return<h1>Not Allowed</h1>;
    }
  return (
    <div className='bg-gray-900 text-white px-3 py-10 rounded-md'>
        <h1 className='font-bold text-xl'>{title}</h1>
        <h2>{language}</h2>
        <Link className='bg-blue-500 px-3 py-1 rounded-sm' to={`/sandbox/${user?._id}/${_id}`}>Open</Link>
    </div>
  )
}

export default FileBox
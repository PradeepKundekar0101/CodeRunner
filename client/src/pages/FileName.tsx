import { useState } from 'react'
const FileName = () => {
    const [title,setTitle] = useState<string>("");
    const handleCreateFile = async()=>{
        
    }
  return (
    <div className='h-screen flex justify-center items-end '>
        <div>
            <form method='post'>
                <input type="text" placeholder='Enter the Title' value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
                <input type="submit" value="Let's Go" className=''/>
            </form>
        </div>
    </div>
  )
}

export default FileName
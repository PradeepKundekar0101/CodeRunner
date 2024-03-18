import { useState } from 'react';
import { useAppSelector } from '../app/hooks';
import { notify } from '../utils/notify';
import { Link, useNavigate } from 'react-router-dom';
// import useAxios from '../hooks/useAxios';
import { Toaster } from 'react-hot-toast';
// import { ArrowLeftIcon } from '@heroicons/react/24/outline';
// import { SparklesCore } from '../components/ui/sparkles';
import { useMutation } from '@tanstack/react-query';
import useCodeService from '../hooks/useCode';
// import React from 'react';

const CreateFile = () => {
  const [title, setTitle] = useState<string>("");
  const {createFile} = useCodeService();
  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const {mutate} = useMutation({
    mutationKey:["createfile"],
    mutationFn: createFile,
    onSuccess:(data)=>{
      navigate(`/sandbox/${user?._id}/${data.sandBox._id}`);
    },
    onError:(data)=>{
      notify(data.message, false);
    }
  });

  const handleCreateFile = async (e: any) => {
    e.preventDefault();
    try {
      if (!token) {
        notify("Not allowed", false);
        return;
      }
      if (title.length < 3) {
        notify("Title is too short", false);
        return;
      }
      mutate({title});
    } catch (error: any) {
      notify(error.message, false);
    }
  };

  return (
    <div className='h-[40rem] relative w-full bg-black flex flex-col items-center justify-center overflow-hidden '>
      <Toaster />
      <div className="w-full absolute inset-0 h-screen">
      </div>
      <div className='flex w-3/5 justify-center flex-col-reverse md:flex-row '>

        <form
          className='flex flex-col  px-8 py-10 relative space-y-2 bg-slate-900 justify-center '
          onSubmit={handleCreateFile}
        >
          <input
            className='px-5 py-2 border border-grey outline-none text-white focus:online-none w-full bg-black rounded-md'
            type="text"
            placeholder='Enter the Title'
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <input
            type="submit"
            value="Let's Go"
            className='inline-flex items-center w-full px-5 py-2 mb-3 mr-1 text-base font-semibold text-white no-underline align-middle bg-blue-600 border border-transparent border-solid rounded-md cursor-pointer select-none sm:mb-0 sm:w-auto hover:bg-blue-700 hover:border-blue-700 hover:text-white focus-within:bg-blue-700 focus-within:border-blue-700 '
          />
            <Link className='text-white absolute  bottom-5 pt-5 text-lg justify-center items-center' to={"/"}>
             <span className='pt-4'>Back</span>
             </Link>
        </form>

        <div className=' w-0 md:w-2/5'>
         <img src={"https://emeritus.org/in/wp-content/uploads/sites/3/2023/02/pexels-neo-2653362-scaled-e1677062152304.jpg.optimal.jpg"} alt="Your Image" className="object-fit" />
        </div>
      </div>

    
    </div>
  );
};

export default CreateFile;

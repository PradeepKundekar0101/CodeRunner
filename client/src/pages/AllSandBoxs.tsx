import useAxios from '../hooks/useAxios';
import { useEffect, useState } from "react";
import FileBox from "../components/FileBox";
import { File } from "../types/code";
import { notify } from "../utils/notify";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import DelModal from '../components/DelModal';
const AllSandBoxs = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [showDelModal,setShowDelModal] = useState<boolean>(false);
  const [fileSelected,setFileSelected] = useState<string>("");
  const axios = useAxios();
  const fetchAllFiles = async () => {
    try {
      const response = await axios.get(`/api/v1/code/user`);
      setFiles(response.data.data.files);
    } catch (error: any) {
      notify(error.response.data.message, false);
    }
  };
  useEffect(() => {
    fetchAllFiles();
  }, []);
  return (
    <div>
      <Toaster />
      {showDelModal && <DelModal fileSelected={fileSelected} setShowDelModal={setShowDelModal}/>}
      <div className="flex justify-between my-2">
        <h1 className="text-white">Your files</h1>
        <Link to="/sandbox/create"  className="relative  items-center justify-start inline-block px-5 py-2 overflow-hidden font-bold group">
          <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
          <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
          <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">Create</span>
          <span className="absolute inset-0 border-2 border-white"></span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {files.map((file, ind) => {
          return (
            <FileBox
              setShowDelModal = {setShowDelModal}
              key={ind}
              _id={file._id}
              title={file.title}
              language={file.language}
              createdAt={file.createdAt}
              setFileSelected = {setFileSelected}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AllSandBoxs;

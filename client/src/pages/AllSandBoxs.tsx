import useAxios from '../service/axios';
import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import FileBox from "../components/FileBox";
import { File } from "../types/code";
import { notify } from "../utils/notify";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
const AllSandBoxs = () => {
  const token = useAppSelector((state) => {
    return state.auth.token;
  });
  const [files, setFiles] = useState<File[]>([]);
  const axios = useAxios();
  const fetchAllFiles = async () => {
    try {
      const response = await axios.get(`/api/v1/code/user`);
      console.log(response);
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
      <div className="flex justify-between my-2">
        <h1 className="text-white">AllSandBoxes</h1>
        <Link to="/sandbox/create" className="bg-white py-2 px-4 ">
          Create +
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {files.map((file, ind) => {
          return (
            <FileBox
              key={ind}
              _id={file._id}
              title={file.title}
              language={file.language}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AllSandBoxs;

import useAxios from '../hooks/useAxios';
import { useEffect, useState } from "react";
import FileBox from "../components/FileBox";
import { File } from "../types/code";
import { notify } from "../utils/notify";
import { Toaster } from "react-hot-toast";
import DelModal from '../components/DelModal';
import CreateButton from '../components/CreateButton';
const AllSandBoxs = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [showDelModal,setShowDelModal] = useState<boolean>(false);
  const [fileSelected,setFileSelected] = useState<string>("");
  const axios = useAxios();
  const fetchAllFiles = async () => {
    try {
      const response = await axios.get(`code/user`);
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
      {showDelModal && files && <DelModal files={files} setFiles={setFiles} fileSelected={fileSelected} setShowDelModal={setShowDelModal}/>}
      <div className="flex justify-between my-2">
        <h1 className="text-white">Your files</h1>
        <CreateButton/>
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

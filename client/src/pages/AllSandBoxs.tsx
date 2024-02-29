
import { useState } from "react";
import FileBox from "../components/FileBox";
import { File } from "../types/code";
import { notify } from "../utils/notify";
import { Toaster } from "react-hot-toast";
import DelModal from "../components/DelModal";
import CreateButton from "../components/CreateButton";
import useCodeService from "../hooks/useCode";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/ui/Loader";
const AllSandBoxs = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [showDelModal, setShowDelModal] = useState<boolean>(false);
  const [fileSelected, setFileSelected] = useState<string>("");

  const {getAllFiles} = useCodeService();
  const {data,isLoading,error,isError} = useQuery({
    queryKey:["files"],
    queryFn:getAllFiles,
  });
  if(isLoading)
  return <Loader/>


  return (
    <div>
      <Toaster />
      {showDelModal && files && (
        <DelModal
          files={files}
          setFiles={setFiles}
          fileSelected={fileSelected}
          setShowDelModal={setShowDelModal}
        />
      )}
      {files && files.length > 0 && (
        <div className="flex justify-between my-2">
          <h1 className="text-white text-3xl">Your files</h1>
          <CreateButton />
        </div>
      )}
      {files && files.length === 0 && (
        <div className="flex justify-center items-center w-full flex-col space-y-4">
          <h1 className="text-3xl text-white text-center">
            Please create a file, no files currently exist
          </h1>
          <CreateButton />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {files && files.map((file:File, ind:number) => {
          return (
            <FileBox
              setShowDelModal={setShowDelModal}
              key={ind}
              _id={file._id}
              title={file.title}
              language={file.language}
              createdAt={file.createdAt}
              setFileSelected={setFileSelected}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AllSandBoxs;

import { File } from "../types/code";
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { MdNavigateNext } from "react-icons/md";
import {format} from 'timeago.js'
import { FaTrash } from "react-icons/fa";
import ErrorBoundary from "./Error";
type FileBoxProps = Omit<Partial<File>, 'setShowDelModal'> & {
  setShowDelModal: React.Dispatch<React.SetStateAction<boolean>>,
  setFileSelected: React.Dispatch<React.SetStateAction<string>>
};
const FileBox = ({ _id, title, language,createdAt,setShowDelModal,setFileSelected}: FileBoxProps) => {
  const user = useAppSelector((state) => {
    return state.auth.user;
  });
  const getImageSrc = (language: string) => {
    return `${language.toLowerCase()}.png`;
  };
  if (!user) {
    return <ErrorBoundary/>;
  }
  const handleClick =()=>{
   setShowDelModal(true);
   setFileSelected(_id||"")
  }
  return (
    <div className="bg-gray-900 border-slate-800 border-2 text-white px-3 py-10 rounded-md">
      
        <button onClick={handleClick} className="py-2 px-2 rounded-full mx-2 relative top-[-25%] left-[90%] "><FaTrash fill="gray"/></button>
    
      <h1 className="font-bold text-xl">{title}</h1>
      <div className="my-2">
        <div className="flex items-center space-x-1 py-1 ">
          <h2>{language}</h2>
          {language?.length !== 0 && (
            <img
              alt="logo"
              src={getImageSrc(language || "")}
              style={{ maxWidth: "25px", maxHeight: "25px" }}
            />
          )}
        </div>
      </div>

      <Link
        className="flex items-center underline font-bold text-xl my-2"
        to={`/sandbox/${user?._id}/${_id}`}
      >
        Open <MdNavigateNext />
      </Link>
     <span className="flex text-sm text-slate-500">Created &nbsp; {createdAt && <h1>{format(createdAt)}</h1>}
      </span>
    </div>
  );
};

export default FileBox;

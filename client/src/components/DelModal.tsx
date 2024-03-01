import { Toaster } from "react-hot-toast";
import useAxios from "../hooks/useAxios";
import { notify } from "../utils/notify";
import { File } from "../types/code";
const DelModal = ({
  setShowDelModal,
  fileSelected,
  files
}: {
  setShowDelModal: React.Dispatch<React.SetStateAction<boolean>>,
  fileSelected:string,

  files: File[]
}) => {
  const axios = useAxios();
  const handleDelete = async () => {
    try {
        await axios.delete("code/"+fileSelected);
        notify("Deleted!",true);
        setTimeout(()=>{
          window.location.reload();
        },800)
        setShowDelModal(false);
        const updateFiles = files.filter((file)=>{return file._id!=fileSelected});
        files = updateFiles
    } catch (error:any) {
        notify(error.response.data.message,false);
        setShowDelModal(false);
    }
  };
  return (
    <>
<Toaster/>
    <div
      id="default-modal"
      aria-hidden="true"
      className=" backdrop-blur-md  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0  z-[10000000]  justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white left-[60%] bottom-[-50%] rounded-lg shadow dark:bg-slate-800">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Delete Confirmation
            </h3>
            <button
              onClick={() => {
                setShowDelModal(false);
              }}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="default-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-4 md:p-5 space-y-4">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this file?
            </p>
          </div>
          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
                onClick={handleDelete}
              data-modal-hide="default-modal"
              type="button"
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Delete
            </button>
            <button
              data-modal-hide="default-modal"
              type="button"
              onClick={()=>{setShowDelModal(false)}}
              className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default DelModal;

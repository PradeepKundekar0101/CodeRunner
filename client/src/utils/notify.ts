import toast from 'react-hot-toast';

export const notify = (message:string,success:boolean) => {
    if(success)
       return toast.success(message);
    return toast.error(message);
}


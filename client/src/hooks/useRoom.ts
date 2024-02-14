
import useAxios from '../hooks/useAxios';
import { IRoom } from '../types/room';
const useRoomService = () => {
    const api = useAxios();
    const createRoom = async ({ name, password, author }: { name: string, password: string, author: string }) => {
        try {
            const { data } = await api.post<{ status: string, data: { room: IRoom } }>(`room`, { name, password, author});
            return data.data;
        } catch (error:any) {
            throw new Error(error.response?.data.message || 'Something went wrong');
        }
    };
    const getRoom = async (roomId:string) => {
        try {
            const { data } = await api.get<{ status: string, data: { room: IRoom } }>(`room/${roomId}`);
            return data.data;
        } catch (error:any) {
            throw new Error(error.response?.data.message || 'Something went wrong');
        }
    };
    return { createRoom,getRoom };
};
export default useRoomService;

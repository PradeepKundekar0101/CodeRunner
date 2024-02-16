
import useAxios from '../hooks/useAxios';
import { IRoom } from '../types/room';
const useRoomService = () => {
    const api = useAxios();
    const createRoom = async ({ name, password, authorId,authorName }: { name: string, password: string, authorId: string,authorName:string }) => {
        try {
            const { data } = await api.post<{ status: string, data: { room: IRoom } }>(`room`, { name, password, authorId,authorName});
            return data.data;
        } catch (error:any) {
            throw new Error(error.response?.data.message || 'Something went wrong');
        }
    };
    const joinRoom = async ({ name, password, userId,userName }: { name: string, password: string, userId: string,userName:string }) => {
        try {
            const { data } = await api.post<{ status: string, data: { room: IRoom } }>(`room/join`, { name, password, userId,userName});
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
    return { createRoom,getRoom,joinRoom };
};
export default useRoomService;

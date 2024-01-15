import { IUser,User} from "../model/user";

class UserService{
    async registerUser(userData:IUser):Promise<IUser>{
        const newUser = await User.create(userData);
        return newUser;
    }
}
export default new UserService();
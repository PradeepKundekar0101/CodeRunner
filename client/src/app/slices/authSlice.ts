import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/user";

type initialStateType ={
    token :string | null 
    user: User | null
}
const initialState :initialStateType = {
    token:null,
    user:null
}
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login : (state,action:PayloadAction<initialStateType>)=>{
           
            state.token = action.payload.token;
            state.user =action.payload.user;
        },
        logout: (state)=>{
            state.token = null;
            state.user = null;
        }
    }
})
export const {login,logout}  = authSlice.actions;
export default authSlice.reducer;
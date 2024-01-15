import {configureStore} from '@reduxjs/toolkit'
//@ts-ignore
import authReducer from './slices/authSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer} from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit'

const persistConfig = {
    storage:storage, 
    key:"root",
    version:1,
}

const reducer = combineReducers({ auth: authReducer })
const persistedReducer = persistReducer(persistConfig,reducer)

export const store = configureStore({
    reducer: persistedReducer,
    devTools:true
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>

 

import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'
import { useAppSelector } from './app/hooks'
import Hello from './pages/Hello'
import SandBox from './pages/SandBox'

function App() {
  const user = useAppSelector((state)=>{return state.auth.user});
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
        <Route path='' element={user?<Home user={user}/>:<Hello/>}/>
         <Route path='signin' element={!user?<SignIn/>:<Navigate to="/"/>}/>
        <Route path='signup' element={!user?<SignUp/>:<Navigate to="/"/>}/>
        <Route path='sandbox' element={user?<SandBox/>:<Navigate to="/sandbox"/>}/>
        <Route path='/notfound' element={<NotFound/>}/>
    </Route>
  ))  
  return (
    <>
      <RouterProvider router={router}/> 
    </>
  )
}

export default App

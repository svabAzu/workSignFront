import { Routes, Route } from 'react-router-dom';
import { LoginPages } from "../pages/LoginPages";
import { RegisterPages } from "../pages/RegisterPages";
import { HomePages } from '../pages/HomePages';
import { ProtectedRouter } from '../hooks/ProtectedRouter';


export default function MyRouters() {
  return (
    <Routes>

      <Route path='/login' element={<LoginPages />} />
      <Route element={<ProtectedRouter redirectTo={'/login'} />}>
        <Route path='/' element={<HomePages />} />
        <Route path='/register' element={<RegisterPages />} />

      </Route>


    </Routes>
  )
}


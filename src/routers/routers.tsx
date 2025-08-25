import { Routes, Route } from 'react-router-dom';
import { LoginPages } from "../pages/LoginPages";
import { RegisterPages, RegisterForm } from "../pages/RegisterPages";
import { HomePages } from '../pages/HomePages';
import { ProtectedRouter } from '../hooks/ProtectedRouter';
import { SettingsPages } from '../pages/SettingsPages';


export default function MyRouters() {
  return (
    <Routes>

      <Route path='/login' element={<LoginPages />} />
      <Route element={<ProtectedRouter redirectTo={'/login'} />}>
        <Route path='/' element={<HomePages />} />
        {/* <Route path='/register' element={<RegisterPages />} /> */}
        <Route path='/setting' element={<SettingsPages />}>
            <Route path='register' element={<RegisterForm />} />
            <Route path='edit-operario' element={<div>Editar operario</div>} />
            <Route path='specialty' element={<div>Especialidades</div>} />
        </Route>

      </Route>


    </Routes>
  )
}


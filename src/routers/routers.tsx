import { Routes, Route } from 'react-router-dom';
import { LoginPages } from "../pages/LoginPages";

import {
 
  RegisterForm
} from "../pages/RegisterPages";

import { HomePages } from '../pages/HomePages';
import { ProtectedRouter } from '../hooks/ProtectedRouter';
import { SettingsPages } from '../pages/SettingsPages';
import { OperatorEditPages } from '../pages/OperatorEditPages';
import { SpecialtyPages } from '../pages/SpecialtyPages';
import { DetailTask } from '../pages/DeteilTask';
import { CreateGeneralTask } from '../pages/CreateGeneralTask';


export default function MyRouters() {
  return (
    <Routes>

      <Route path='/login' element={<LoginPages />} />

      <Route element={<ProtectedRouter redirectTo={'/login'} />}>
        <Route path='/' element={<HomePages />} />
        <Route path='/individualTask/:id' element={<DetailTask />} />



        <Route path='/newJob' element={<CreateGeneralTask />} />
          

       

        

        <Route path='/setting' element={<SettingsPages />}>
          <Route path='register' element={<RegisterForm />} />
          <Route path='edit-operario' element={<OperatorEditPages />} />
          <Route path='specialty' element={<SpecialtyPages />} />
        </Route>

      </Route>


    </Routes>
  )
}


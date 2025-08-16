import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import  {LoginPages}  from "./pages/LoginPages";
import  {RegisterPages}  from "./pages/RegisterPages";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<h1>Home</h1>} />
        <Route path='/login' element={<LoginPages />} />
        <Route path='/register' element={<RegisterPages />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

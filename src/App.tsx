import MyRouters from './routers/routers'


import { Sidebar } from './components/sidebar/Sidebar'
import React, { useState } from 'react';



function App() {

  const [siderbarOpen, setSidebarOpen] = useState(false);

  const siderbarStateActive = "grid grid-cols-[90px_auto] bg-gray-500 transition-all duration-200 "
  const siderbarState = "grid grid-cols-[250px_auto] bg-gray-500 transition-all duration-200"

  return (
    <div className='flex flex-col h-screen'>
      <div className='w-full h-8 bg-[#199431]'></div>
      <div className={siderbarOpen ? siderbarStateActive : siderbarState}>
        <Sidebar siderbarOpen={siderbarOpen} setSidebarOpen={setSidebarOpen} />
        <MyRouters />
      </div>
    </div>


  )
}

export default App


import MyRouters from './routers/routers';
import { Sidebar } from './components/sidebar/Sidebar';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';


function App() {
  const [siderbarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();
  const siderbarStateActive = "grid grid-cols-[90px_auto] bg-gray-500 transition-all duration-200 ";
  const siderbarState = "grid grid-cols-[250px_auto] bg-gray-500 transition-all duration-200";

  return (


    <div className='flex flex-col h-auto'>
<div className="fixed top-0 left-0 w-full h-8 bg-[#199431] z-50"></div>
      
      {pathname !== '/login' ? (
        <div className={siderbarOpen ? siderbarStateActive : siderbarState}>
          <Sidebar siderbarOpen={siderbarOpen} setSidebarOpen={setSidebarOpen} />
          <MyRouters />
        </div>
      ) : (

        <MyRouters />
      )}
    </div>

  );
}

export default App;
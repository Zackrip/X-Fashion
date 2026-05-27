import React, { useState } from 'react'
import { HiBars3BottomLeft } from "react-icons/hi2";
import AdminSidebar from './AdminSidebar';
import { Outlet } from 'react-router-dom';
const AdminLayout = () => {
    const [navDrawerOPen, setNavDrawerOPen] = useState(false);
      const toggleNavDrawer = () => {
        setNavDrawerOPen(!navDrawerOPen);
      };
    return (
    <>
        <div className='min-h-screen flex flex-col md:flex-row relative'>
            <div className='flex md:hidden  p-4 bg-gray-900 text-white z-20'>
                <button onClick={toggleNavDrawer}>
                    <HiBars3BottomLeft size={24}/>
                </button>
                <h1 className='ml-4 text-xl font-medium'>Admin Dashbord</h1>
            </div>
            {navDrawerOPen && (
                <div className='fixed inset-0 z-10 bg-black opacity-50 md:hidden' onClick={toggleNavDrawer}></div>
            )}

            <div className={`bg-gray-900 w-64 min-h-screen md:relative text-white absolute transform ${navDrawerOPen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 md:translate-x-0 md:static md:block z-20`}>

                <AdminSidebar />
            </div>
            <div className='flex-grow p-6 overflow-auto'>
                <Outlet />
            </div>
        </div>
    </>
    
  )
}

export default AdminLayout
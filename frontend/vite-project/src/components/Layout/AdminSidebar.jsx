import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa";
import { FaClipboardList, FaShop } from 'react-icons/fa6';

const Adminsidebar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate('/user/login')
    }
  return (
    <div className='p-6'> 
        <div className='mb-6'>
            <Link to='/admin' className='text-2xl font-bold underline'>
                Xfashions
            </Link>
        </div>
        <h2 className='font-xl font-bold mb-6 uppercase text-center '>Admin Dashboard</h2>

        <nav className='flex flex-col space-y-2'>
            <NavLink to='/admin/users' className={({isActive}) => isActive? "bg-gray-700 text-white px-4 py-3 rounded flex items-center space-x-2" : "text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-3 rounded flex items-center space-x-2 "}>
                <FaUser />
                <span>
                    User
                </span>
            </NavLink>

            <NavLink to='/admin/products' className={({isActive}) => isActive? "bg-gray-700 text-white px-4 py-3 rounded flex items-center space-x-2" : "text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-3 rounded flex items-center space-x-2 "}>
                <FaBoxOpen />
                <span>
                    Products
                </span>
            </NavLink>

            <NavLink to='/admin/orders' className={({isActive}) => isActive? "bg-gray-700 text-white px-4 py-3 rounded flex items-center space-x-2" : "text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-3 rounded flex items-center space-x-2 "}>
                <FaClipboardList />
                <span>
                    Orders
                </span>
            </NavLink>

            <NavLink to='/admin/shop' className={({isActive}) => isActive? "bg-gray-700 text-white px-4 py-3 rounded flex items-center space-x-2" : "text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-3 rounded flex items-center space-x-2 "}>
                <FaShop />
                <span>
                    Shop
                </span>
            </NavLink>
        </nav>
        <div className='mt-6'>
            <button onClick={handleLogout} className='w-full px-4 py-3 text-xl flex items-center justify-center text-center font-normal rounded bg-red-500 gap-3 hover:bg-red-700 cursor-pointer'>
               <FaSignOutAlt />
               Logout
            </button>
        </div>
    </div>
  )
}

export default Adminsidebar
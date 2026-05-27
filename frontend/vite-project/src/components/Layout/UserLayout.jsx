import React from 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import { Outlet } from 'react-router-dom'
import ReelsButton from '../Common/ReelsButton'

const UserLayout = () => {
  return (
    <div>
      <Header/>
      <main className='pt-20'>
        <Outlet />    
      </main>
      <Footer />
      <ReelsButton />
    </div>
  )
}

export default UserLayout
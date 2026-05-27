import React from 'react'
import heroImg from '../../assets/images/Hero.avif'
import heroImg2 from '../../assets/images/HeroMobile.avif'
import { Link } from 'react-router-dom'
const Hero = () => {
  return (
    <section className=''>
        <img src={heroImg} alt='Sense' className='w-full hidden md:block   md:h-[600px] object-cover overflow-hidden '/>
        <img src={heroImg2} alt='Sense' className='w-full block md:hidden  h-[400px] object-cover overflow-hidden '/>
        <div className=' flex absolute inset-0 bg-black/5 items-center justify-center h-[600px] mt-26 overflow-hidden'> 
            <div className='text-center p-6 text-white'>
                <h1 className='text-4xl md:text-6xl font-bold text-white tracking-tighter mb-4'>Discover Your Style with Sense</h1>
                <Link to='#' className='bg-white text-gray-950 px-4 py-1 rounded-full space-y-20 hover:text-xl duration-300'>Explore</Link>
            </div>
        </div>
    </section>
  )
}

export default Hero
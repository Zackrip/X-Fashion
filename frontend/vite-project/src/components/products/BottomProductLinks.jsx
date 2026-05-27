import React from 'react'
import { Link } from 'react-router-dom'

const BottomProductLinks = () => {
  return (
    <div className="py-10 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 md:gap-10 gap-6 max-w-6xl">
            <div className='hidden md:block'>
                <h3 className='text-lg font-semibold mb-4'>Shoes</h3>
                <ul className='space-y-2 text-sm flex flex-col'>
                    <Link to='/collection/sneakers'>
                        <li className='cursor-pointer hover:underline'>Sneakers</li>
                    </Link>
                    <Link to='/collection/men'><li className='cursor-pointer hover:underline'>Running</li></Link>
                    <Link to='/collection'><li className='cursor-pointer hover:underline'>All Shoes</li></Link>
                </ul>
            </div>
            <div className='hidden md:block'>
                <h3 className='text-lg font-semibold mb-4'>Men</h3>
                <ul className='space-y-2 text-sm flex flex-col'>
                    <Link to='/collection/men'><li className='cursor-pointer hover:underline'>Top Wear</li></Link>
                    <Link to='/collection/men'><li className='cursor-pointer hover:underline'>Bottom Wear</li></Link>
                    <Link to='/collection/men'><li className='cursor-pointer hover:underline'>Accessories</li></Link>
                </ul>
            </div>
            <div className='hidden md:block'>
                <h3 className='text-lg font-semibold mb-4'>Women</h3>
                <ul className='space-y-2 text-sm flex flex-col'>
                    <Link to='/collection/women'><li className='cursor-pointer hover:underline'>Dresses</li></Link>
                    <Link to='/collection/women'><li className='cursor-pointer hover:underline'>Tops</li></Link>
                    <Link to='/collection/women'><li className='cursor-pointer hover:underline'>Accessories</li></Link>
                </ul>
            </div>
            <div className='hidden md:block'>
                <h3 className='text-lg font-semibold mb-4'>Seasons Collection</h3>
                <ul className='space-y-2 text-sm flex flex-col'>
                    <Link to='/collection'><li className='cursor-pointer hover:underline'>Summer</li></Link>
                    <Link to='/collection'><li className='cursor-pointer hover:underline'>Winter</li></Link>
                    <Link to='/collection'><li className='cursor-pointer hover:underline'>Spring</li></Link>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default BottomProductLinks
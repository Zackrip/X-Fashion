import React from 'react'
import { Link } from 'react-router-dom'

const TopBar = () => {
  return (
    <div className="flex justify-center items-center bg-gray-300 border-b border-gray-200 py-1 px-4">
            <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center text-center text-xs sm:text-sm">
                <p className="tracking-tight">
                  Get Free Delivery in 2-4 days. Easy Returns & Size Exchanges.
                </p>
                <Link to="/shop">
                  <p className='ml-2 underline cursor-pointer hover:text-gray-800'>
                    Shop Now
                  </p>
                </Link>
            </div>
    </div>
  )
}

export default TopBar
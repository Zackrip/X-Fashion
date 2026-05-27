import React from 'react'
import featuredImg from '../../assets/images/FeaturedImages.jpg'
import featuredImg2 from '../../assets/images/FeaturedImages2.jpg'
import featuredImg3 from '../../assets/images/FeaturedImages3.jpg'
import { Link } from 'react-router-dom'
const FeaturedImg = () => {
    
  return (
    <>
        <div className='py-13 px-8 w-full'>
            <h2 className='text-xl font-semibold mb-6'>Featured</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <Link to="/collection/men">
                    <div className='relative group overflow-hidden'>
                        <img src={featuredImg} alt='Featured' className='w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-300'/>
                        <div className='absolute inset-0 bg-black/30'></div>
                            <div>
                                <h3 className='absolute bottom-4 left-4 text-white text-xl font-semibold'>Men's Collection</h3>
                            </div>
                    </div>
                </Link>  
                
                <Link to="/collection/women">
                    <div className='relative group overflow-hidden'>
                        <img src={featuredImg2} alt='Featured' className='w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-300'/>
                        <div className='absolute inset-0 bg-black/30'></div>
                            <div>
                                <h3 className='absolute bottom-4 left-4 text-white text-xl font-semibold'>Women's Collection</h3>
                            </div>
                    </div>
                </Link>

                <Link to="/collection/sneakers">  
                    <div className='relative group overflow-hidden'>
                        <img src={featuredImg3} alt='Featured' className='w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-300'/>
                        <div className='absolute inset-0 bg-black/30'></div>
                            <div>
                                <h3 className='absolute bottom-4 left-4 text-white text-xl font-semibold'>Sneakers</h3>
                            </div>
                    </div>
                </Link>

                <Link to="/collection">
                    <div className='relative group overflow-hidden'>
                        <img src={featuredImg} alt='Featured' className='w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-300'/>
                        <div className='absolute inset-0 bg-black/30'></div>
                            <div>
                                <h3 className='absolute bottom-4 left-4 text-white text-xl font-semibold'>All Collections</h3>
                            </div>
                    </div>
                </Link>
            </div>
        </div>
    </>
  )
}

export default FeaturedImg
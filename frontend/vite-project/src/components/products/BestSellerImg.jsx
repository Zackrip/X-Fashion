import React, { useRef } from 'react'
import { Link } from 'react-router-dom'

const BestSellerImg = () => {
    const scrollRef = useRef(null);

      const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -400,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 400,
      behavior: "smooth",
    });
  };
    const bestSellingProducts = [
        {
            productId: 1,
            name: "Sneakers",
            productImageUrl: "https://picsum.photos/200/300?random=1"
        },
        {
            productId: 2,
            name: "Bottom Wear Collections",
            productImageUrl: "https://picsum.photos/200/300?random=2"
        },
        {
            productId: 3,
            name: "Upper Wear Collections",
            productImageUrl: "https://picsum.photos/200/300?random=3"
        },
        {
            productId: 4,
            name: "Winter Collection",
            productImageUrl: "https://picsum.photos/200/300?random=4"
        },
        {
            productId: 5,
            name: "Watches",
            productImageUrl: "https://picsum.photos/200/300?random=5"
        },
        {
            productId: 7,
            name: "Running",
            productImageUrl: "https://picsum.photos/200/300?random=7"
        },
        
    ]
  return (
    <div className='py-13 px-8 w-full  relative'>
        <h2 className='text-xl font-semibold mb-6'>Top Collections</h2>
        <div  ref={scrollRef} className="flex overflow-x-auto gap-8 no-scrollbar scroll-smooth">
            {bestSellingProducts.map((product)=>(
                <Link key={product.productId} to='#'>
                    <div className='relative group overflow-hidden p-2 hover:border min-w-[300px] '>
                    <img src={product.productImageUrl} alt={product.name} className='w-full h-[400px] object-cover'/>
                    <div className='absolute inset-0  '></div>
                    <div>
                        <h3 className="mt-4  font-semibold tracking-wide border-b-2 border-black inline-block ">
                            {product.name}
                        </h3>
                        
                    </div>    
                </div>
                </Link>
            ))}
                <button onClick={scrollRight} className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 bg-white shadow-xl w-12 h-12 items-center       justify-center">
                    →
                </button>
                <button onClick={scrollLeft} className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 bg-white shadow-xl w-12 h-12 items-center justify-center">
                    ←
                </button>
        </div>
    </div>
  )
}

export default BestSellerImg
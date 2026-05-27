import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner';
import { FaTruckFast } from "react-icons/fa6";
import { FaArrowRotateRight } from "react-icons/fa6";

const Checkout = () => {

  const cartItems = useSelector((state) => state.cart.items);

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    pinCode: '',
    city: ''
  });

  const navigate = useNavigate();
  const handlePayment = (e) => {
  e.preventDefault();

  const { firstName, lastName, address1, address2, pinCode, city, email, phone } = shippingInfo;

  if (!firstName || !lastName || !address1 || !pinCode || !city || !email || !phone) {
    toast.error("Please fill all required fields");
    return;
  }

  // Save to localStorage so Payment page can access it
  localStorage.setItem("shippingInfo", JSON.stringify(shippingInfo));
  navigate('/checkout/payment');
};


const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * (item.quantity || 1);
  }, 0);

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl min-h-screen mx-auto py-10 px-6'>
      <div className='bg-white rounded-lg '>
        <div className='text-4xl font-semibold mb-6'>CHECKOUT</div>
        <form>
          <h3 className='uppercase text-lg font-semibold mb-6'>Shipping Information</h3>
          
            <div className='mb-6 grid lg:grid-cols-2 gap-4 '>
              <div>
                <label className='block uppercase text-xs mb-1 font-bold'>First Name</label>
                <input 
                      type='text' 
                      value={shippingInfo.firstName}
                      onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                      required
                      className='w-full border border-gray-300  py-2 px-3 focus:outline-none hover:ring hover:ring-black'
                       />
              </div>
              <div>
                <label className='block mb-1 text-xs uppercase font-bold '>Last Name</label>
                <input 
                      type='text'
                      required 
                      value={shippingInfo.lastName}
                      onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                      className='w-full border border-gray-300  py-2 px-3 focus:outline-none hover:ring hover:ring-black' />
              </div>
            </div>
            <div className='mb-6'>
              <label className='block mb-1 text-xs uppercase font-bold'>Address 1</label>
              <input 
                    type='text' 
                    value={shippingInfo.address1}
                    onChange={(e) => setShippingInfo({...shippingInfo, address1: e.target.value})}
                    required
                    className='border  border-gray-300  py-2 px-3 focus:outline-none hover:ring hover:ring-black w-full'
                  />
            </div>
            <div className='mb-6'>
              <label className='block mb-1 text-xs uppercase font-bold'>Address 2</label>
              <input
                    type='text'
                    value={shippingInfo.address2}
                    onChange={(e) => setShippingInfo({...shippingInfo, address2: e.target.value})}
                    required
                    className='border  border-gray-300  py-2 px-3 focus:outline-none hover:ring hover:ring-black w-full'
                  />
            </div>
            <div className='mb-6'>
              <label className='block mb-1 text-xs uppercase font-bold'>Pin Code</label>
              <input
                    type='text'
                    value={shippingInfo.pinCode}
                    onChange={(e) => setShippingInfo({...shippingInfo, pinCode: e.target.value})}
                    required
                    className='border  border-gray-300  py-2 px-3 focus:outline-none hover:ring hover:ring-black w-full'
                  />
            </div>
            <div className='mb-6'>
              <label className='block mb-1 text-xs uppercase font-bold'>City</label>
              <input
                    type='text'
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                    required
                    className='border  border-gray-300  py-2 px-3 focus:outline-none hover:ring hover:ring-black w-full'
                  />
            </div>

          <h3 className='uppercase text-lg font-semibold mb-6'>Enter Contact Information</h3>
            <div className='grid lg:grid-cols-2 gap-4'>
              <div>
                <label className='block mb-1 text-xs uppercase font-bold'>Email</label>
                <input
                      type='email'
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                      required
                      className='border  border-gray-300  py-2 px-3 focus:outline-none hover:ring hover:ring-black w-full'
                    />
              </div>
              <div>
                <label className='block mb-1 text-xs uppercase font-bold'>Phone Number</label>
                <input
                      type='tel'
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                      required
                      className='border  border-gray-300  py-2 px-3 focus:outline-none hover:ring hover:ring-black w-full'
                    />
              </div>
            </div>
            <button type="button" onClick={handlePayment} className="w-full bg-black text-white py-4 text-xl font-semibold cursor-pointer uppercase px-4 mt-10 rounded hover:bg-gray-800">
              Continue to Payment
            </button>
        </form>
      </div>
      <div className="p-6 flex flex-col h-fit">

        <div>
            <div className="block  border px-4 py-3 border border-gray-400 mb-6  -mt-6">
                <p className="font-bold flex items-center justify-center gap-2 uppercase text-green-600">
                    <FaTruckFast /> 
                        You’ve earned free shipping
                </p>
            </div>
            <div className="block  border px-4 py-3 border border-gray-400 mb-6 -mt-2 ">
                <p className="font-bold flex items-center justify-center gap-2 uppercase text-gray-600">
                    <FaArrowRotateRight />
                        Free returns on all qualifying order.
                </p>
            </div>
        </div>
              
              <h2 className="text-2xl tracking-tight text-gray-700 flex items-center justify-center font-bold mb-6">
                SUMMURY
              </h2>

              <div className="font-bold text-gray-700">
                <div className="flex justify-between mb-1">
                  <span>SUBTOTAL</span>
                  <span>₹{totalPrice}</span>
                </div>

                <div className="flex justify-between mb-1">
                  <span>SHIPPING COSTS</span>
                  <span className="text-green-500">Free</span>
                </div>

                <div className="flex justify-between mb-4">
                  <span>ORDER DISCOUNT</span>
                  <span>₹91.23</span>
                </div>
              </div>

              <div className="flex justify-between font-bold text-xl tracking-tight border-t pt-4">
                <span>GRAND TOTAL</span>
                {/* <span className="text-sm flex uppercase tracking-tighter  items-center text-gray-500">Prices include GST</span> */}
                <span>₹{totalPrice}</span>
              </div>
            </div>
          
    </div>
  )
}

export default Checkout
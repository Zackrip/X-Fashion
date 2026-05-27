import React from 'react'
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-500 px-6 py-12 border-t-2 border-gray-300">
      <div className="max-w-7xl mx-auto">

        {/* Top Links Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-4 gap-8">

          {/* Column 1 */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Find A Store</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Become A Member</li>
              <li className="hover:text-white cursor-pointer">
                <Link to='#'>Sign Up For Email</Link>
              </li>
              <li className="hover:text-white cursor-pointer">Student Discounts</li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Get Help</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Order Status</li>
              <li className="hover:text-white cursor-pointer">Shipping & Delivery</li>
              <li className="hover:text-white cursor-pointer">Returns</li>
              <li className="hover:text-white cursor-pointer">Payment Options</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">About Sense</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">News</li>
              <li className="hover:text-white cursor-pointer">Careers</li>
              <li className="hover:text-white cursor-pointer">Investors</li>
              <li className="hover:text-white cursor-pointer">Sustainability</li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4 text-xl">
            
              <Link to='#'><span className="hover:text-white cursor-pointer"><FaInstagram /></span></Link>
              <Link to='#'><span className="hover:text-white cursor-pointer"><FaXTwitter/></span></Link>
              
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm gap-4">

          <p>© 2026 Xfasion, Inc. All Rights Reserved</p>

          <div className="flex gap-6">
            <Link to='#'><span className="hover:text-gray-900 cursor-pointer">Guides</span></Link>
            <Link to='#'><span className="hover:text-gray-900 cursor-pointer">Terms of Sale</span></Link>
            <Link to='#'><span className="hover:text-gray-900 cursor-pointer">Privacy Policy</span></Link>
          </div>

        </div>

      </div>
    </footer>
  )
}

export default Footer
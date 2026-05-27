import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../Store/cartSlice";
const CartContents = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div className="lg:col-span-2 border border-gray-200 p-6">
      {cartItems.map((item) => (
        <div
          key={`${item.productId}-${item.size}-${item.color}`}
          className="flex gap-3 md:gap-6 border-b pb-4 md:pb-6 mb-4 md:mb-6 last:border-none"
        >
          {/* IMAGE */}
          <div className="w-20 h-20 md:w-36 md:h-36 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={item.image || item.imageUrl || "/placeholder.jpg"}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* DETAILS */}
          <div className="flex-1 flex flex-col justify-between">
            {/* TOP */}
            <div className="flex justify-between">
              <div>
                <h2 className="font-semibold text-sm md:text-lg">{item.name}</h2>
                <p className="text-xs md:text-sm text-gray-600 flex mt-1">
                  Size: <span className="text-black ml-2">{item.size || "—"}</span>
                </p>
                <p className="text-xs md:text-sm text-gray-600 flex">
                  Color: <span className="text-black ml-2">{item.color || "—"}</span>
                </p>
              </div>

              {/* PRICE */}
              <div className="text-right text-red-800 font-semibold">
                ₹{item.price}
              </div>
            </div>

            {/* BOTTOM */}
            <div className="flex justify-between items-center mt-4">
              {/* QUANTITY CONTROLS */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => dispatch(removeFromCart(item.productId))}
                  className="border px-3 py-1 cursor-pointer hover:bg-gray-100"
                >
                  -
                </button>

                <span className="font-medium">{item.quantity || 1}</span>

                <button
                  onClick={() => dispatch(addToCart(item))}
                  className="border px-3 py-1 cursor-pointer hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              {/* REMOVE */}
              <button
                onClick={() => dispatch(removeFromCart(item.productId))}
                className="text-sm text-gray-500 cursor-pointer hover:text-black"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents;

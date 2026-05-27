import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const statusColors = {
  pending:    "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped:    "bg-purple-100 text-purple-700",
  delivered:  "bg-green-100 text-green-700",
  cancelled:  "bg-red-100 text-red-700",
};

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_URL}/api/orders/my-orders`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      withCredentials: true,
    })
      .then((res) => setOrders(res.data.orders))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-10">My Orders</h1>
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-32 bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <div className="text-5xl mb-4">📦</div>
          <p className="text-lg font-medium">No orders yet</p>
          <p className="text-sm mt-1 mb-6">Start shopping to see your orders here</p>
          <Link to="/collection" className="bg-black text-white px-6 py-3 rounded-full text-sm">
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="border rounded-2xl p-5 shadow-sm">

              {/* ORDER HEADER */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
                <div>
                  <p className="text-xs text-gray-400">Order ID</p>
                  <p className="font-mono text-sm font-medium">#{order._id.slice(-8).toUpperCase()}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                  <p className="font-bold text-lg">₹{order.totalPrice}</p>
                </div>
              </div>

              {/* ORDER ITEMS */}
              <div className="space-y-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 border-t pt-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-xl bg-gray-100"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-gray-400">
                        {item.size && `Size: ${item.size}`}
                        {item.color && ` · Color: ${item.color}`}
                      </p>
                      <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-sm">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              {/* SHIPPING INFO */}
              <div className="mt-4 pt-4 border-t text-xs text-gray-500">
                <p className="font-semibold text-gray-700 mb-1">Shipping to:</p>
                <p>{order.shippingInfo?.firstName} {order.shippingInfo?.lastName}</p>
                <p>{order.shippingInfo?.address1}, {order.shippingInfo?.city} - {order.shippingInfo?.pinCode}</p>
                <p className="mt-1">Payment: <span className="capitalize font-medium text-gray-700">{order.paymentMethod}</span></p>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;

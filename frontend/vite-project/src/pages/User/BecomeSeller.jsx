import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const BecomeSeller = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // fetch fresh user status from backend
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        withCredentials: true,
      })
      .then((res) => setStatus(res.data.user?.sellerStatus))
      .catch(() => setStatus("none"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/auth/become-seller`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      setStatus("pending");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  // already a partner
  if (user?.role === "partner") {
    navigate("/seller");
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-4 bg-white p-10 rounded-2xl shadow-lg text-center">

        {status === "pending" && (
          <>
            <div className="text-5xl mb-4">⏳</div>
            <h1 className="text-2xl font-bold mb-3">Application Pending</h1>
            <p className="text-gray-500 text-sm">
              Your seller application is under review. Our admin team will
              approve it shortly. You'll be able to access the seller dashboard once approved.
            </p>
          </>
        )}

        {status === "rejected" && (
          <>
            <div className="text-5xl mb-4">❌</div>
            <h1 className="text-2xl font-bold mb-3">Application Rejected</h1>
            <p className="text-gray-500 text-sm mb-6">
              Unfortunately your application was rejected. You can apply again.
            </p>
            <form onSubmit={handleSubmit}>
              <button type="submit" className="w-full bg-black text-white py-4 rounded-full font-semibold hover:bg-gray-800 transition cursor-pointer">
                Apply Again
              </button>
            </form>
          </>
        )}

        {(status === "none" || status === null) && (
          <>
            <div className="text-5xl mb-4">🚀</div>
            <h1 className="text-2xl font-bold mb-3">Become a Seller</h1>
            <p className="text-gray-500 text-sm mb-8">
              Join our seller community and start listing your products today.
              Reach thousands of customers instantly.
            </p>

            <div className="space-y-3 mb-8 text-sm text-gray-600 text-left">
              <div className="flex items-center gap-3">
                <span>✅</span><p>List unlimited products</p>
              </div>
              <div className="flex items-center gap-3">
                <span>✅</span><p>Manage your own seller dashboard</p>
              </div>
              <div className="flex items-center gap-3">
                <span>✅</span><p>Reach thousands of customers</p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <button type="submit" className="w-full bg-black text-white py-4 rounded-full font-semibold hover:bg-gray-800 transition cursor-pointer">
                Apply — Become a Seller
              </button>
            </form>
            <p className="text-xs text-gray-400 mt-4">
              Your application will be reviewed by an admin before approval.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default BecomeSeller;

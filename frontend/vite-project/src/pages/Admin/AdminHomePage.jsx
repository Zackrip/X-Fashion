import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'

const API_URL = import.meta.env.VITE_API_URL
const headers = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` })

const AdminHomePage = () => {
  const [pendingUsers, setPendingUsers] = useState([])
  const [stats, setStats] = useState({ users: 0, products: 0, sellers: 0, pending: 0 })
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const [pendingRes, allUsersRes, productsRes] = await Promise.all([
        axios.get(`${API_URL}/api/auth/pending-sellers`, { headers: headers(), withCredentials: true }),
        axios.get(`${API_URL}/api/auth/all-users`, { headers: headers(), withCredentials: true }),
        axios.get(`${API_URL}/api/products`),
      ])
      setPendingUsers(pendingRes.data.users)
      setStats({
        users: allUsersRes.data.users.length,
        products: productsRes.data.products.length,
        sellers: allUsersRes.data.users.filter(u => u.role === "partner").length,
        pending: pendingRes.data.users.length,
      })
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  const handleApprove = async (userId) => {
    try {
      const res = await axios.patch(`${API_URL}/api/auth/approve-seller/${userId}`, {}, { headers: headers(), withCredentials: true })
      toast.success(res.data.message)
      fetchData()
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to approve")
    }
  }

  const handleReject = async (userId) => {
    try {
      const res = await axios.patch(`${API_URL}/api/auth/reject-seller/${userId}`, {}, { headers: headers(), withCredentials: true })
      toast.success(res.data.message)
      fetchData()
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reject")
    }
  }

  const statCards = [
    { label: "Total Users", value: stats.users, icon: "👥" },
    { label: "Total Products", value: stats.products, icon: "📦" },
    { label: "Active Sellers", value: stats.sellers, icon: "🏪" },
    { label: "Pending Applications", value: stats.pending, icon: "⏳" },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Dashboard Overview</h1>
      <p className="text-gray-500 text-sm mb-6">Welcome back, Admin 👑</p>

      {/* STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl shadow p-5">
            <div className="text-3xl mb-2">{s.icon}</div>
            <div className="text-2xl font-bold">{loading ? "—" : s.value}</div>
            <div className="text-sm text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* PENDING SELLER APPLICATIONS */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold mb-1">Pending Seller Applications</h2>
        <p className="text-sm text-gray-400 mb-6">Review and approve/reject seller requests.</p>

        {loading ? (
          <p className="text-gray-400 text-sm">Loading...</p>
        ) : pendingUsers.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <div className="text-4xl mb-3">✅</div>
            <p>No pending applications</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingUsers.map((user) => (
              <div key={user._id} className="flex flex-col sm:flex-row sm:items-center justify-between border rounded-xl p-4 gap-3">
                <div>
                  <h3 className="font-semibold">{user.fullName}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <span className="inline-block mt-1 text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">⏳ Pending</span>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => handleApprove(user._id)} className="bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800 transition cursor-pointer">Approve ✅</button>
                  <button onClick={() => handleReject(user._id)} className="border border-gray-300 px-4 py-2 rounded-full text-sm hover:bg-gray-100 transition cursor-pointer">Reject ❌</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminHomePage
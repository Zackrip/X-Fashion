import React, { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

const roleBadge = {
  admin: "bg-purple-100 text-purple-700",
  partner: "bg-green-100 text-green-700",
  user: "bg-gray-100 text-gray-600",
}

const AdminUsersPage = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    axios.get(`${API_URL}/api/auth/all-users`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      withCredentials: true,
    })
      .then(res => setUsers(res.data.users))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const filtered = users.filter(u =>
    u.fullName.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">All Users</h1>
      <p className="text-gray-500 text-sm mb-6">{users.length} registered users</p>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full md:w-80 border rounded-full px-4 py-2 text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-gray-300"
      />

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading...</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="text-left px-6 py-4">Name</th>
                <th className="text-left px-6 py-4">Email</th>
                <th className="text-left px-6 py-4">Role</th>
                <th className="text-left px-6 py-4">Seller Status</th>
                <th className="text-left px-6 py-4">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(user => (
                <tr key={user._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium">{user.fullName}</td>
                  <td className="px-6 py-4 text-gray-500">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${roleBadge[user.role]}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {user.sellerStatus !== "none" ? (
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        user.sellerStatus === "pending" ? "bg-yellow-100 text-yellow-700" :
                        user.sellerStatus === "approved" ? "bg-green-100 text-green-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {user.sellerStatus}
                      </span>
                    ) : (
                      <span className="text-gray-300 text-xs">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    {new Date(user.createdAt).toLocaleDateString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default AdminUsersPage

import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const SuperAdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('ALL');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await api.get('/admin/users');
            setUsers(res.data);
        } catch (err) {
            setError('Failed to fetch users');
        }
    };

    const handleDelete = async (username) => {
        if (!window.confirm(`Are you sure you want to delete ${username}?`)) return;
        try {
            await api.delete(`/admin/users/${username}`);
            setUsers(users.filter(u => u.username !== username));
        } catch (err) {
            alert('Failed to delete user');
        }
    };

    const filteredUsers = users.filter(user => {
        if (filter === 'ALL') return true;
        return user.role === filter;
    });

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
                Super Admin Dashboard
            </h2>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            {/* Filter */}
            <div className="flex justify-center items-center gap-4 mb-6">
                <label className="text-gray-700 font-medium">Filter by Role:</label>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                    <option value="ALL">All Roles</option>
                    <option value="SUPER_ADMIN">Super Admin</option>
                    <option value="MANAGER">Manager</option>
                    <option value="USER">User</option>
                </select>
            </div>

            {/* Users Grid */}
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                {filteredUsers.length === 0 && (
                    <p className="text-center text-gray-600 col-span-full">
                        No users found for this filter.
                    </p>
                )}

                {filteredUsers.map(user => (
                    <div
                        key={user.id}
                        className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center hover:shadow-lg transition"
                    >
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">{user.username}</h3>
                            <span className="text-sm text-indigo-600 bg-indigo-100 px-2 py-1 rounded-md mt-1 inline-block">
                                {user.role.replace('ROLE_', '')}
                            </span>
                        </div>
                        <button
                            onClick={() => handleDelete(user.username)}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SuperAdminDashboard;

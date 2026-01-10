import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const ManagerDashboard = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await api.get('/manager/users');
            setUsers(res.data);
        } catch (err) {
            setError('Failed to fetch users');
        }
    };

    const handleDelete = async (username) => {
        if (!window.confirm(`Are you sure you want to delete ${username}?`)) return;
        try {
            await api.delete(`/manager/users/${username}`);
            setUsers(users.filter(u => u.username !== username));
        } catch (err) {
            alert('Failed to delete user. Managers can only delete USER roles.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
                Manager Dashboard
            </h2>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                {users.length === 0 && (
                    <p className="text-center text-gray-600 col-span-full">No users found.</p>
                )}

                {users.map(user => (
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

export default ManagerDashboard;

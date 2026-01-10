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
        <div className="container">
            <h2 className="text-center" style={{ marginBottom: '2rem' }}>Super Admin Dashboard</h2>
            {error && <p className="error-msg text-center">{error}</p>}

            <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center' }}>
                <label style={{ color: '#e5e7eb' }}>Filter by Role: </label>
                <select
                    className="form-input"
                    style={{ width: 'auto', display: 'inline-block' }}
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="ALL" style={{ color: 'black' }}>All Roles</option>
                    <option value="SUPER_ADMIN" style={{ color: 'black' }}>Super Admin</option>
                    <option value="MANAGER" style={{ color: 'black' }}>Manager</option>
                    <option value="USER" style={{ color: 'black' }}>User</option>
                </select>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {filteredUsers.length === 0 && <p className="text-center">No users found for this filter.</p>}
                {filteredUsers.map(user => (
                    <div key={user.id} className="glass-card" style={{ margin: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '100%' }}>
                        <div>
                            <h3 style={{ margin: 0 }}>{user.username}</h3>
                            <span style={{ fontSize: '0.9rem', color: '#a5b4fc', background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                                {user.role}
                            </span>
                        </div>
                        <button className="btn" style={{ background: '#ef4444', width: 'auto' }} onClick={() => handleDelete(user.username)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SuperAdminDashboard;

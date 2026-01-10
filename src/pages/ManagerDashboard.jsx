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
        <div className="container">
            <h2 className="text-center" style={{ marginBottom: '2rem' }}>Manager Dashboard</h2>
            {error && <p className="error-msg text-center">{error}</p>}

            <div style={{ display: 'grid', gap: '1rem' }}>
                {users.length === 0 && <p className="text-center">No users found.</p>}
                {users.map(user => (
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

export default ManagerDashboard;

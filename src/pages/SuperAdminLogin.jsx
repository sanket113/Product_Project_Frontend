import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const SuperAdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/super-admin-login', { username, password });
            const { token, role } = response.data;
            login(token, role, username);
            navigate('/admin-dashboard');
        } catch (err) {
            setError('Access Denied. Only Super Admins allowed.');
        }
    };

    return (
        <div className="container">
            <div className="glass-card" style={{ boxShadow: '0 8px 32px 0 rgba(220, 38, 38, 0.3)' }}>
                <h2 className="text-center" style={{ color: '#f87171' }}>Super Admin Login</h2>
                {error && <p className="error-msg text-center">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Username</label>
                        <input type="text" className="form-input" value={username} onChange={e => setUsername(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-input" value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn" style={{ background: '#dc2626' }}>Login as Admin</button>
                </form>
            </div>
        </div>
    );
};

export default SuperAdminLogin;

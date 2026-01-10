import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', { username, password });
            const { token, role } = response.data;
            login(token, role, username);

            if (role === 'ROLE_SUPER_ADMIN') navigate('/admin-dashboard');
            else if (role === 'ROLE_MANAGER') navigate('/manager-dashboard');
            else navigate('/user-dashboard');
        } catch (err) {
            setError(err.response?.status === 401 ? 'Invalid credentials' : 'Login failed');
        }
    };

    return (
        <div className="container">
            <div className="glass-card">
                <h2 className="text-center">Login</h2>
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
                    <button type="submit" className="btn">Login</button>
                    <p className="text-center mt-4">
                        Don't have an account? <Link to="/register">Register</Link>
                    </p>
                    <p className="text-center text-xs mt-4">
                        <Link to="/super-admin-login">Super Admin Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;

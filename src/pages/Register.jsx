import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', password: '', role: 'USER' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', formData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="container">
            <div className="glass-card">
                <h2 className="text-center">Register</h2>
                {error && <p className="error-msg text-center">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Username</label>
                        <input type="text" className="form-input"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })} required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-input"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Role</label>
                        <select className="form-input"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
                            <option value="USER" style={{ color: 'black' }}>User</option>
                            <option value="MANAGER" style={{ color: 'black' }}>Manager</option>
                        </select>
                    </div>
                    <button type="submit" className="btn">Create Account</button>
                    <p className="text-center mt-4">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;

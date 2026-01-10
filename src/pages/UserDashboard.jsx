import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const UserDashboard = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await api.get('/user/profile');
            setProfile(res.data);
        } catch (err) {
            setError('Failed to fetch profile');
        }
    };

    if (error) return <div className="container text-center error-msg">{error}</div>;
    if (!profile) return <div className="container text-center">Loading...</div>;

    return (
        <div className="container">
            <h2 className="text-center" style={{ marginBottom: '2rem' }}>My Profile</h2>
            <div className="glass-card">
                <div style={{ textAlign: 'center' }}>
                    <div style={{ width: '80px', height: '80px', background: 'white', borderRadius: '50%', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#312e81', fontSize: '2rem', fontWeight: 'bold' }}>
                        {profile.username.charAt(0).toUpperCase()}
                    </div>
                    <h3>{profile.username}</h3>
                    <p style={{ color: '#a5b4fc', background: 'rgba(255,255,255,0.1)', padding: '0.5rem', borderRadius: '8px', display: 'inline-block' }}>
                        Role: {profile.role}
                    </p>
                    <div style={{ marginTop: '2rem', color: '#cbd5e1' }}>
                        <p>User ID: {profile.id}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;

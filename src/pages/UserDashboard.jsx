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

    if (error)
        return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
    if (!profile)
        return <div className="min-h-screen flex items-center justify-center text-gray-600">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8 flex justify-center">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
                
                {/* Avatar */}
                <div className="w-20 h-20 bg-indigo-100 text-indigo-800 rounded-full flex items-center justify-center mx-auto text-2xl font-bold mb-4">
                    {profile.username.charAt(0).toUpperCase()}
                </div>

                {/* Username */}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{profile.username}</h3>

                {/* Role badge */}
                <span className="inline-block bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    Role: {profile.role.replace('ROLE_', '')}
                </span>

                {/* Additional info */}
                <div className="text-gray-600 mt-4 space-y-1">
                    <p>User ID: {profile.id}</p>
                    {/* You can add more profile info here if needed */}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;

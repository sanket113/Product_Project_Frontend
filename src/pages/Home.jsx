import React from 'react';

const Home = () => {
    const dummyFeatures = [
        { title: 'Secure Authentication', desc: 'JWT-based security ensuring your data remains private and protected.' },
        { title: 'Role-Based Access', desc: 'Granular permissions for Admin and Users.' },
        { title: 'Modern Interface', desc: 'Built with React and glassmorphism design principles.' },
        { title: 'Fast Performance', desc: 'Optimized backend with Spring Boot and efficient frontend rendering.' }
    ];

    return (
        <div className="container">
            <div className="text-center" style={{ padding: '4rem 0' }}>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', background: 'linear-gradient(to right, #a78bfa, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Task Tracker Application
                </h1>
                <p style={{ fontSize: '1.2rem', color: '#cbd5e1', maxWidth: '600px', margin: '0 auto' }}>
                    Manage your tasks seamlessly and stay focused on what matters most. Track progress, update status, and work smarter every day.
                </p>
                <div style={{ marginTop: '2rem' }}>
                    <a href="/register" className="btn" style={{ display: 'inline-block', width: 'auto', padding: '1rem 2rem' }}>Get Started</a>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '4rem' }}>
                {dummyFeatures.map((feature, index) => (
                    <div key={index} className="glass-card" style={{ margin: 0, padding: '1.5rem' }}>
                        <h3 style={{ color: '#a78bfa', marginTop: 0 }}>{feature.title}</h3>
                        <p style={{ color: '#e2e8f0', lineHeight: '1.6' }}>{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;

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
                <div className="mt-8">
                    <a
                        href="/register"
                        className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                    >
                        Get Started
                    </a>
                </div>
            </div>

            {/* Features Section */}
            <div className="max-w-6xl mx-auto px-4 py-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {dummyFeatures.map((feature, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow"
                    >
                        <h3 className="text-indigo-600 font-semibold text-xl mb-2">{feature.title}</h3>
                        <p className="text-gray-700 text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;

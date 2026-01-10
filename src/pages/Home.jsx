import React from 'react';

const Home = () => {
    const dummyFeatures = [
        { title: 'Secure Authentication', desc: 'JWT-based security ensuring your data remains private and protected.' },
        { title: 'Role-Based Access', desc: 'Granular permissions for Super Admins, Managers, and Users.' },
        { title: 'Modern Interface', desc: 'Built with React and clean design principles.' },
        { title: 'Fast Performance', desc: 'Optimized backend with Spring Boot and efficient frontend rendering.' }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="text-center py-20 px-4">
                <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                    Next-Gen RBAC System
                </h1>
                <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
                    Manage your users with elegance and efficiency. Experience the power of role-based access control.
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

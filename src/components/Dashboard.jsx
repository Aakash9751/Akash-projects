import React, { useEffect, useState } from 'react';

function Dashboard({ userId }) {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock fetch user data
        setTimeout(() => {
            setUserData({
                name: "Aakash N",
                role: "Admin",
                // Notice there is no 'recentActivity' array here!
            });
            setLoading(false);
        }, 1000);
    }, [userId]);

    if (loading) return <div>Loading dashboard...</div>;

    return (
        <div className="dashboard">
            <h1>Welcome back, {userData.name}</h1>
            <p>Role: {userData.role}</p>
            
            <div className="activity-feed">
                <h2>Recent Activity</h2>
                {/* BUG: userData.recentActivity is undefined, so calling .map() will crash the entire React app with "Cannot read properties of undefined (reading 'map')" */}
                <ul>
                    {userData.recentActivity.map((activity, index) => (
                        <li key={index}>{activity.description} - {activity.date}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Dashboard;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Dashboard.css'; // Import the CSS file

const Dashboard = () => {
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const data = localStorage.getItem('user-info');
        const userData = data ? JSON.parse(data) : null;
        setUserInfo(userData);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user-info');
        navigate('/login');
    };

    // Add a conditional rendering check:
    if (!userInfo) {
        return <div className="loading-message">Loading...</div>;
    }

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-header">Welcome, {userInfo.name}!</h1>
            <div className="user-info">
                <img
                    src={userInfo.image}
                    alt={userInfo.email}
                    className="user-image"
                />
                <h3 className="user-email">{userInfo.email}</h3>
                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
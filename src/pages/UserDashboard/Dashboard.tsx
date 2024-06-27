import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Users from './pages/Users/Users';
import UserDetails from './pages/Users/UserDetails';
import './Dashboard.scss';

const Dashboard: React.FC = () => {
    return (
        <div className="dashboard-container">
            <Router>
                <Sidebar />
                <div className="main-content">
                    <Navbar />
                    <Routes>
                        <Route path="users" element={<Users />} />
                        <Route path="userdetails" element={<UserDetails />} />
                
                    </Routes>
                </div>
            </Router>
        </div>
    );
};

export default Dashboard;

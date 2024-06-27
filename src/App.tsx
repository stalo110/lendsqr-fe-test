import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import "./App.scss";
import Dashboard from "./pages/UserDashboard/Dashboard";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          {/* You can add more routes here as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;

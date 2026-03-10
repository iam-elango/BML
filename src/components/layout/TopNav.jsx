import React from 'react';
import { NavLink } from 'react-router-dom';
import { Activity, Database, Settings } from 'lucide-react';
import './TopNav.css';

const TopNav = () => {
  return (
    <nav className="top-nav">
      <div className="nav-container">
        <div className="nav-brand">
          <Activity className="brand-icon" />
          <span>SecureIoT</span>
        </div>
        
        <div className="nav-links">
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            end
          >
            <Activity size={18} />
            Dashboard
          </NavLink>
          
          <NavLink 
            to="/explorer" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            <Database size={18} />
            Blockchain Explorer
          </NavLink>
          
          <NavLink 
            to="/settings" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            <Settings size={18} />
            Settings
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;

import React from 'react';
import './Sidebar.scss';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
<div className="sidebar">
            <ul>
                <li><Link to="page1">Page 1</Link></li>
                <li><Link to="page2">Page 2</Link></li>
                {/* Add more links as needed */}
            </ul>
        </div>
  )
}

export default Sidebar;
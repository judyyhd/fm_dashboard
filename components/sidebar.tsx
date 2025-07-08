import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Home,
  Activity,
  Boxes,
  ClipboardList,
  Settings
} from 'lucide-react';

const navItems = [
  { path: '/', name: 'Dashboard', icon: <Home size={20} /> },
  { path: '/financial-overview', name: 'Real-Time Data', icon: <Activity size={20} /> },
  { path: '/asset-management', name: 'Asset Management', icon: <Boxes size={20} /> },
  { path: '/work-orders', name: 'Work Order Center', icon: <ClipboardList size={20} /> },
  { path: '/settings', name: 'Settings', icon: <Settings size={20} /> },
];

const Sidebar = () => {
  const router = useRouter();

  return (
    <div className="sidebar sidebar-hidden">
      <div className="sidebar-header">
        <img 
          src="/neuron-logo.svg" 
          alt="Neuron Logo" 
          className="sidebar-logo"
        />
      </div>
      <div className="sidebar-nav-container">
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const isActive = router.pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
              >
                <span className="sidebar-nav-icon">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, ClipboardListIcon, BoxIcon, SettingsIcon, ActivityIcon } from 'lucide-react';
const Sidebar = () => {
  const navItems = [{
    path: '/',
    name: 'Dashboard',
    icon: <HomeIcon size={20} />
  }, {
    path: '/financial-overview',
    name: 'Real-Time Data',
    icon: <ActivityIcon size={20} />
  }, {
    path: '/asset-management',
    name: 'Asset Management',
    icon: <BoxIcon size={20} />
  }, {
    path: '/work-orders',
    name: 'Work Order Center',
    icon: <ClipboardListIcon size={20} />
  }, {
    path: '/settings',
    name: 'Settings',
    icon: <SettingsIcon size={20} />
  }];
  return <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        <img src="/neuron-logo.svg" alt="Neuron Logo" className="h-10 w-auto" />
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navItems.map(item => <NavLink key={item.path} to={item.path} className={({
          isActive
        }) => `flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </NavLink>)}
        </nav>
      </div>
    </div>;
};
export default Sidebar;
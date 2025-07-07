// src/components/Layout.tsx
import React from 'react';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();

  const navigation = [
    { name: 'Dashboard', href: '/Dashboard', icon: '📊' },
    { name: 'Work Orders', href: '/WorkOrders', icon: '📋' },
    { name: 'Asset Management', href: '/AssetManagement', icon: '🏗️' },
    { name: 'Real-Time Data', href: '/RealTimeData', icon: '📈' },
    { name: 'Settings', href: '/Settings', icon: '⚙️' },
  ];

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        {/* Logo/Brand */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Facility Manager</h1>
          <p className="text-sm text-gray-500 mt-1">Smart Building Control</p>
        </div>
        
        {/* Navigation */}
        <nav className="mt-6">
          <div className="px-3 space-y-1">
            {navigation.map((item) => {
              const isActive = router.pathname === item.href;
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.name}
                  {isActive && (
                    <span className="ml-auto">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Footer/Status */}
        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-xs text-gray-500">System Online</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Last sync: {new Date().toLocaleTimeString()}</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
import React, { useState } from 'react';
import { BellIcon, MenuIcon, SearchIcon, XIcon } from 'lucide-react';
import SearchBar from './common/SearchBar';
import NotificationCenter from './common/NotificationCenter';
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  return <header className="bg-white border-b border-gray-200 z-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center md:hidden">
            <button type="button" className="text-gray-500 hover:text-gray-600 focus:outline-none" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
          <div className="hidden md:block md:w-full max-w-md">
            <SearchBar />
          </div>
          <div className="flex items-center">
            <div className="relative">
              <button type="button" className="p-2 rounded-full text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none" onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}>
                <span className="sr-only">View notifications</span>
                <div className="relative">
                  <BellIcon className="h-6 w-6" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                </div>
              </button>
              {isNotificationsOpen && <NotificationCenter onClose={() => setIsNotificationsOpen(false)} />}
            </div>
            <div className="ml-4 flex items-center">
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                JD
              </div>
            </div>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <SearchBar />
          </div>
        </div>}
    </header>;
};
export default Header;
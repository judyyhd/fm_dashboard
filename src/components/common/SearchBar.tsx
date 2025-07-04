import React, { useState } from 'react';
import { SearchIcon } from 'lucide-react';
const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  return <div className="relative w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input type="text" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Search for assets, work orders, tenants..." value={query} onChange={e => setQuery(e.target.value)} onFocus={() => setIsFocused(true)} onBlur={() => setTimeout(() => setIsFocused(false), 200)} />
      </div>
      {isFocused && query.length > 0 && <div className="absolute mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 z-10">
          <div className="py-1">
            <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
              Recent Searches
            </p>
            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setQuery('HVAC maintenance')}>
              HVAC maintenance
            </button>
            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setQuery('Tenant: Acme Corp')}>
              Tenant: Acme Corp
            </button>
            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setQuery('Security cameras')}>
              Security cameras
            </button>
          </div>
        </div>}
    </div>;
};
export default SearchBar;
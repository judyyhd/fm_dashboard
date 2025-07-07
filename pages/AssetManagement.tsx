import React from 'react';
import { PlusIcon, FilterIcon, DownloadIcon, BoxIcon, ClockIcon, AlertTriangleIcon, CheckCircleIcon } from 'lucide-react';

// Data structure for n8n agent to populate
interface AssetStats {
  totalAssets: number;
  operational: number;
  maintenanceDue: number;
  criticalIssues: number;
}

interface Asset {
  id: string;
  name: string;
  category: string;
  location: string;
  purchaseDate: string;
  lastMaintenance: string;
  status: 'Operational' | 'Maintenance Due' | 'Needs Repair';
  statusColor: string;
}

interface AssetData {
  stats: AssetStats;
  assets: Asset[];
  totalCount: number;
  currentPage: number;
  itemsPerPage: number;
}

const AssetManagement = () => {
  // This data will be populated by your n8n agent
  // ID: asset-management-data
  const assetData: AssetData = {
    stats: {
      totalAssets: 248,
      operational: 232,
      maintenanceDue: 12,
      criticalIssues: 4
    },
    assets: [
      {
        id: "AST-1001",
        name: "HVAC Unit #1",
        category: "HVAC",
        location: "Building A, Roof",
        purchaseDate: "Jun 15, 2019",
        lastMaintenance: "Mar 10, 2023",
        status: "Operational",
        statusColor: "bg-green-100 text-green-800"
      },
      {
        id: "AST-1002",
        name: "HVAC Unit #2",
        category: "HVAC",
        location: "Building A, Roof",
        purchaseDate: "Jun 15, 2019",
        lastMaintenance: "Jan 5, 2023",
        status: "Maintenance Due",
        statusColor: "bg-amber-100 text-amber-800"
      },
      {
        id: "AST-1025",
        name: "Elevator #3",
        category: "Elevator",
        location: "Building B, Main",
        purchaseDate: "Aug 20, 2020",
        lastMaintenance: "Jul 15, 2023",
        status: "Operational",
        statusColor: "bg-green-100 text-green-800"
      },
      {
        id: "AST-1042",
        name: "Backup Generator",
        category: "Power",
        location: "Building C, Basement",
        purchaseDate: "Mar 10, 2021",
        lastMaintenance: "May 22, 2023",
        status: "Needs Repair",
        statusColor: "bg-red-100 text-red-800"
      },
      {
        id: "AST-1078",
        name: "Security System",
        category: "Security",
        location: "All Buildings",
        purchaseDate: "Nov 5, 2022",
        lastMaintenance: "Jun 30, 2023",
        status: "Operational",
        statusColor: "bg-green-100 text-green-800"
      }
    ],
    totalCount: 248,
    currentPage: 1,
    itemsPerPage: 5
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Asset Management</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center">
          <PlusIcon className="h-4 w-4 mr-1" /> Add New Asset
        </button>
      </div>

      {/* Stats Cards - n8n agent should update these */}
      {/* ID: asset-stats-cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="bg-white rounded-lg shadow p-5 flex items-center">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
            <BoxIcon className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Assets</p>
            <p className="text-2xl font-semibold text-gray-800" data-field="totalAssets">
              {assetData.stats.totalAssets}
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-5 flex items-center">
          <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
            <CheckCircleIcon className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Operational</p>
            <p className="text-2xl font-semibold text-gray-800" data-field="operational">
              {assetData.stats.operational}
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-5 flex items-center">
          <div className="p-3 rounded-full bg-amber-100 text-amber-600 mr-4">
            <ClockIcon className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Maintenance Due</p>
            <p className="text-2xl font-semibold text-gray-800" data-field="maintenanceDue">
              {assetData.stats.maintenanceDue}
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-5 flex items-center">
          <div className="p-3 rounded-full bg-red-100 text-red-600 mr-4">
            <AlertTriangleIcon className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Critical Issues</p>
            <p className="text-2xl font-semibold text-gray-800" data-field="criticalIssues">
              {assetData.stats.criticalIssues}
            </p>
          </div>
        </div>
      </div>

      {/* Asset Table */}
      <div className="bg-white rounded-lg shadow">
        {/* Table Header with Controls */}
        <div className="p-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h2 className="text-lg font-medium text-gray-800">Asset Inventory</h2>
          <div className="flex space-x-2">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search assets..." 
                className="pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm" 
              />
              <span className="absolute right-3 top-2.5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
            </div>
            <button className="border border-gray-300 rounded-md px-3 py-2 flex items-center text-sm text-gray-700 hover:bg-gray-50">
              <FilterIcon className="h-4 w-4 mr-1" /> Filter
            </button>
            <button className="border border-gray-300 rounded-md px-3 py-2 flex items-center text-sm text-gray-700 hover:bg-gray-50">
              <DownloadIcon className="h-4 w-4 mr-1" /> Export
            </button>
          </div>
        </div>

        {/* Table Content - n8n agent should update this */}
        {/* ID: asset-table-content */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Maintenance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200" data-content="asset-list">
              {assetData.assets.map((asset) => (
                <tr key={asset.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{asset.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{asset.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.purchaseDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.lastMaintenance}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${asset.statusColor}`}>
                      {asset.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900">
                    <a href="#">View</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination - n8n agent should update counts */}
        {/* ID: asset-pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">1</span> to{' '}
            <span className="font-medium" data-field="itemsPerPage">{assetData.itemsPerPage}</span> of{' '}
            <span className="font-medium" data-field="totalCount">{assetData.totalCount}</span> assets
          </div>
          <div className="flex space-x-2">
            <button 
              className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50" 
              disabled={assetData.currentPage === 1}
            >
              Previous
            </button>
            <button className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetManagement;
// WorkOrders.tsx - Replace your existing WorkOrders.tsx with this
import React, { useState } from 'react';
import { PlusIcon, FilterIcon, SlidersIcon, LayoutListIcon, ClipboardListIcon } from 'lucide-react';
import { useWorkOrders } from '../contexts/WorkOrderContext';
type WorkOrder = {
  id: string;
  issue: string;
  location: string;
  requestedBy: string;
  assignedTo: string;
  dueDate: string;
  status: string;
  priority: string;
  description: string;
  statusColor: string;
  priorityColor: string;
};
const WorkOrders = () => {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'assign'>('list');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const getWorkOrderStats = () => ({
    total: workOrders.length,
    inProgress: workOrders.filter(wo => wo.status === 'In Progress').length,
    highPriority: workOrders.filter(wo => wo.priority === 'High').length,
    unassigned: workOrders.filter(wo => wo.assignedTo === 'Unassigned').length,
  });
  
  const stats = getWorkOrderStats();

  // Simple demo function to create a work order
  const createDemoWorkOrder = () => {
    const newWorkOrder = {
      id: `WO-${Date.now()}`,
      issue: "Demo Work Order",
      location: "Building A, Floor 1",
      requestedBy: "Demo User",
      assignedTo: "Unassigned",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      status: "Open",
      priority: "Medium",
      description: "This is a demo work order created by clicking the button",
      statusColor: "bg-yellow-100 text-yellow-800",
      priorityColor: "bg-blue-100 text-blue-800"
    };
    
    setWorkOrders(prev => [...prev, newWorkOrder]);
  };

  const renderEmptyState = () => (
    <div className="text-center py-12">
      <ClipboardListIcon className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">No work orders</h3>
      <p className="mt-1 text-sm text-gray-500">
        Work orders created by AI agents or users will appear here.
      </p>
      <div className="mt-6">
        <button 
          onClick={createDemoWorkOrder}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Create Demo Work Order
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Work Order Center</h1>
        <div className="flex items-center space-x-3">
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            <button 
              className={`px-3 py-1.5 text-sm font-medium flex items-center ${
                viewMode === 'list' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setViewMode('list')}
            >
              <LayoutListIcon className="h-4 w-4 mr-1.5" />
              List View
            </button>
          </div>
          <button 
            onClick={createDemoWorkOrder}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
          >
            <PlusIcon className="h-4 w-4 mr-1" /> Create Work Order
          </button>
        </div>
      </div>

      {/* Work Orders Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-lg font-medium text-gray-800">
              All Work Orders
              {workOrders.length > 0 && (
                <span className="ml-2 text-sm text-gray-500">
                  ({workOrders.length} total)
                </span>
              )}
            </h2>
          </div>
          <div className="flex space-x-2">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search work orders..." 
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
              <SlidersIcon className="h-4 w-4 mr-1" /> Sort
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          {workOrders.length > 0 ? (
            <>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested By</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {workOrders.map((workOrder) => (
                    <tr key={workOrder.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {workOrder.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {workOrder.issue}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {workOrder.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {workOrder.requestedBy}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {workOrder.assignedTo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {workOrder.dueDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${workOrder.statusColor}`}>
                          {workOrder.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${workOrder.priorityColor}`}>
                          {workOrder.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            {workOrder.assignedTo === 'Unassigned' ? 'Assign' : 'Reassign'}
                          </button>
                          <button className="text-blue-600 hover:text-blue-900">
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Showing <span className="font-medium">1</span> to{' '}
                  <span className="font-medium">{Math.min(10, workOrders.length)}</span> of{' '}
                  <span className="font-medium">{workOrders.length}</span> results
                </div>
                <div className="flex space-x-2">
                  <button className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50" disabled>
                    Previous
                  </button>
                  <button className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700 hover:bg-gray-50">
                    Next
                  </button>
                </div>
              </div>
            </>
          ) : (
            renderEmptyState()
          )}
        </div>
      </div>

      {/* Quick Stats */}
      {workOrders.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <ClipboardListIcon className="h-4 w-4 text-gray-600" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Total</p>
                <p className="text-lg font-semibold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">In Progress</p>
                <p className="text-lg font-semibold text-gray-900">{stats.inProgress}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">High Priority</p>
                <p className="text-lg font-semibold text-gray-900">{stats.highPriority}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Unassigned</p>
                <p className="text-lg font-semibold text-gray-900">{stats.unassigned}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkOrders;

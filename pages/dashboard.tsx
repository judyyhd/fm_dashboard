import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Fetch dashboard data from API
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        console.log('Fetching dashboard data...');
        
        const response = await fetch('/api/energy-analysis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}) // Empty body - n8n will generate everything
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Dashboard data received:', data);
        
        setDashboardData(data);
        setLastUpdated(new Date().toLocaleString());
        
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchDashboardData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading facility data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️ Error</div>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // No data state
  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No dashboard data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Dynamic Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {dashboardData.title || 'Facility Dashboard'}
          </h1>
          {dashboardData.subtitle && (
            <p className="text-gray-600 mt-1">{dashboardData.subtitle}</p>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {lastUpdated && (
            <span className="text-sm text-gray-500">
              Last updated: {lastUpdated}
            </span>
          )}
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Dynamic Summary Cards */}
      {dashboardData.summary && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries(dashboardData.summary).map(([key, value]) => (
            <div key={key} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wider">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Dynamic Quick Actions - Updated to use agent's structure */}
      {dashboardData.quickActions && dashboardData.quickActions.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">AI-Powered Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dashboardData.quickActions.map((action, index) => (
              <div 
                key={action.id || index} 
                className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                  action.priority === 'high' || action.color === 'red' ? 'border-red-200 bg-red-50 hover:bg-red-100' :
                  action.priority === 'medium' || action.color === 'amber' ? 'border-orange-200 bg-orange-50 hover:bg-orange-100' :
                  'border-blue-200 bg-blue-50 hover:bg-blue-100'
                }`}
              >
                <h3 className="font-medium text-gray-900">{action.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                {action.priority && (
                  <span className={`inline-block px-2 py-1 text-xs rounded mt-2 ${
                    action.priority === 'high' ? 'bg-red-100 text-red-800' :
                    action.priority === 'medium' ? 'bg-orange-100 text-orange-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {action.priority} priority
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dynamic Alerts - Updated to use agent's structure */}
      {dashboardData.alerts && dashboardData.alerts.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">System Alerts</h2>
          <div className="space-y-3">
            {dashboardData.alerts.map((alert, index) => (
              <div 
                key={alert.id || index} 
                className={`p-4 rounded-lg border ${
                  alert.severity === 'high' || alert.color === 'red' ? 'bg-red-50 border-red-200' :
                  alert.severity === 'medium' || alert.color === 'amber' || alert.color === 'yellow' ? 'bg-yellow-50 border-yellow-200' :
                  'bg-blue-50 border-blue-200'
                }`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className={`w-3 h-3 rounded-full mt-1 ${
                      alert.severity === 'high' || alert.color === 'red' ? 'bg-red-500' :
                      alert.severity === 'medium' || alert.color === 'amber' || alert.color === 'yellow' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`}></div>
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-900">{alert.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                    {alert.equipment && (
                      <p className="text-xs text-gray-500 mt-1">Equipment: {alert.equipment}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Widgets Section - Updated for agent's structure */}
      {dashboardData.widgets && dashboardData.widgets.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Status Widgets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dashboardData.widgets.map((widget, index) => (
              <div key={widget.id || index} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      widget.color === 'red' ? 'bg-red-100' :
                      widget.color === 'orange' ? 'bg-orange-100' :
                      widget.color === 'purple' ? 'bg-purple-100' :
                      'bg-blue-100'
                    }`}>
                      <div className={`w-4 h-4 rounded-full ${
                        widget.color === 'red' ? 'bg-red-500' :
                        widget.color === 'orange' ? 'bg-orange-500' :
                        widget.color === 'purple' ? 'bg-purple-500' :
                        'bg-blue-500'
                      }`}></div>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">{widget.title}</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {widget.value || widget.data || 'N/A'}
                      {widget.unit && <span className="text-sm text-gray-500 ml-1">{widget.unit}</span>}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Additional Chart Widgets (if you want to add bar charts later) */}
      {dashboardData.chartData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Equipment Status</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dashboardData.chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

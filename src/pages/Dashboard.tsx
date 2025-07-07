import React from 'react';
import { useDashboard } from '@/contexts/DashboardContext';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line,
  AreaChart, Area
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

const Dashboard = () => {
  const { dashboardData, loading, error } = useDashboard();

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

  if (error || !dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️ Error</div>
          <p className="text-gray-600">{error || 'No data available.'}</p>
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

  const { title, subtitle, summary, quickActions, alerts, widgets } = dashboardData;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Refresh
        </button>
      </div>

      {/* Summary Cards */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries(summary).map(([key, value]) => (
            <div key={key} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wider">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      {quickActions?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map(action => (
              <div key={action.id} className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                action.priority === 'high' ? 'border-red-200 bg-red-50 hover:bg-red-100' :
                action.priority === 'medium' ? 'border-yellow-200 bg-yellow-50 hover:bg-yellow-100' :
                'border-blue-200 bg-blue-50 hover:bg-blue-100'
              }`}>
                <h3 className="font-medium text-gray-900">{action.label}</h3>
                <p className="text-sm text-gray-600 mt-1">{action.action}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Alerts */}
      {alerts?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">System Alerts</h2>
          <div className="space-y-3">
            {alerts.map(alert => (
              <div key={alert.id} className={`p-4 rounded-lg border ${
                alert.type === 'error' ? 'bg-red-50 border-red-200' :
                alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                'bg-blue-50 border-blue-200'
              }`}>
                <h3 className="font-medium text-gray-900">{alert.message}</h3>
                <p className="text-sm text-gray-600 mt-1">Equipment: {alert.equipment}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Widgets */}
      {widgets?.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {widgets.map((widget, index) => (
            <div key={widget.id || index} className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">{widget.title}</h2>
              <pre className="text-sm text-gray-600 bg-gray-50 p-3 rounded overflow-x-auto">
                {JSON.stringify(widget.data, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

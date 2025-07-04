import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

useEffect(() => {
  fetch('/api/energy-analysis', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({})
  })
  .then(res => res.json())
  .then(data => {
    console.log('Dashboard data:', data);
    setDashboardData(data);
  });
}, []);


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

      {/* Dynamic Quick Actions */}
      {dashboardData.quickActions && dashboardData.quickActions.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dashboardData.quickActions.map((action, index) => (
              <div 
                key={action.id || index} 
                className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                  action.severity === 'critical' ? 'border-red-200 bg-red-50 hover:bg-red-100' :
                  action.severity === 'high' ? 'border-orange-200 bg-orange-50 hover:bg-orange-100' :
                  action.severity === 'medium' ? 'border-yellow-200 bg-yellow-50 hover:bg-yellow-100' :
                  'border-blue-200 bg-blue-50 hover:bg-blue-100'
                }`}
              >
                <h3 className="font-medium text-gray-900">{action.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                {action.severity && (
                  <span className={`inline-block px-2 py-1 text-xs rounded mt-2 ${
                    action.severity === 'critical' ? 'bg-red-100 text-red-800' :
                    action.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                    action.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {action.severity}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dynamic Alerts */}
      {dashboardData.alerts && dashboardData.alerts.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">System Alerts</h2>
          <div className="space-y-3">
            {dashboardData.alerts.map((alert, index) => (
              <div 
                key={alert.id || index} 
                className={`p-4 rounded-lg border ${
                  alert.type === 'critical' ? 'bg-red-50 border-red-200' :
                  alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                  alert.type === 'success' ? 'bg-green-50 border-green-200' :
                  'bg-blue-50 border-blue-200'
                }`}
              >
                <h3 className="font-medium text-gray-900">{alert.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                {alert.timestamp && (
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(alert.timestamp).toLocaleString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dynamic Widgets/Charts */}
      {dashboardData.widgets && dashboardData.widgets.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {dashboardData.widgets.map((widget, index) => (
            <div key={widget.id || index} className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">
                {widget.title}
              </h2>
              
              {/* Render different chart types based on widget.type */}
              <div className="h-80">
                {widget.type === 'bar' && widget.data && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={widget.data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey={widget.xKey || "name"} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {widget.bars && widget.bars.map((bar, i) => (
                        <Bar 
                          key={i}
                          dataKey={bar.key} 
                          fill={bar.color || COLORS[i % COLORS.length]} 
                          name={bar.name}
                          stackId={bar.stackId}
                        />
                      ))}
                    </BarChart>
                  </ResponsiveContainer>
                )}

                {widget.type === 'pie' && widget.data && (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie 
                        data={widget.data} 
                        cx="50%" 
                        cy="50%" 
                        outerRadius={80} 
                        dataKey={widget.valueKey || "value"}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {widget.data.map((entry, i) => (
                          <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                )}

                {widget.type === 'line' && widget.data && (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={widget.data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey={widget.xKey || "name"} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {widget.lines && widget.lines.map((line, i) => (
                        <Line 
                          key={i}
                          type="monotone" 
                          dataKey={line.key} 
                          stroke={line.color || COLORS[i % COLORS.length]}
                          name={line.name}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                )}

                {widget.type === 'area' && widget.data && (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={widget.data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey={widget.xKey || "name"} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {widget.areas && widget.areas.map((area, i) => (
                        <Area 
                          key={i}
                          type="monotone" 
                          dataKey={area.key} 
                          fill={area.color || COLORS[i % COLORS.length]}
                          name={area.name}
                        />
                      ))}
                    </AreaChart>
                  </ResponsiveContainer>
                )}

                {widget.type === 'list' && widget.data && (
                  <div className="space-y-2 max-h-80 overflow-y-auto">
                    {widget.data.map((item, i) => (
                      <div key={i} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="font-medium">{item.name || item.label}</span>
                        <span className="text-gray-600">{item.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {widget.type === 'metrics' && widget.data && (
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(widget.data).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <p className="text-2xl font-bold text-gray-900">{value}</p>
                        <p className="text-sm text-gray-600">{key}</p>
                      </div>
                    ))}
                  </div>
                )}

                {!widget.type && (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <pre className="text-xs">{JSON.stringify(widget.data, null, 2)}</pre>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
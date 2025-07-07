import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/energy-analysis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({})
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        setDashboardData(data);
        setLastUpdated(new Date().toLocaleString());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading facility data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 mb-2">⚠️ {error}</p>
          <button onClick={() => window.location.reload()} className="bg-blue-600 text-white px-4 py-2 rounded">
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">No data available</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">{dashboardData.title}</h1>
          {dashboardData.subtitle && <p className="text-gray-600">{dashboardData.subtitle}</p>}
        </div>
        <div className="text-sm text-gray-500">
          {lastUpdated && <span>Last updated: {lastUpdated}</span>}
        </div>
      </div>

      {dashboardData.summary && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries(dashboardData.summary).map(([key, value]) => (
            <div key={key} className="bg-white p-4 rounded shadow">
              <h3 className="text-sm text-gray-600 uppercase">{key.replace(/([A-Z])/g, ' $1')}</h3>
              <p className="text-2xl font-semibold text-gray-900">{value}</p>
            </div>
          ))}
        </div>
      )}

      {dashboardData.quickActions?.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {dashboardData.quickActions.map((action, i) => (
              <div key={action.id || i} className="bg-white p-4 rounded shadow border">
                <h3 className="text-lg font-medium">{action.label}</h3>
                <p className="text-sm text-gray-600 mt-1">{action.action}</p>
                <p className="text-xs text-gray-400 mt-2">Equipment: {action.equipment}</p>
                <span className="inline-block mt-2 px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">{action.priority}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {dashboardData.alerts?.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">System Alerts</h2>
          <div className="space-y-4">
            {dashboardData.alerts.map((alert, i) => (
              <div key={alert.id || i} className="p-4 rounded border bg-red-50 border-red-200">
                <p className="font-medium text-red-700">{alert.message}</p>
                <p className="text-sm text-gray-600">Equipment: {alert.equipment}</p>
                <span className="inline-block mt-2 px-2 py-1 text-xs rounded bg-red-100 text-red-800">{alert.severity}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {dashboardData.widgets?.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {dashboardData.widgets.map((widget, i) => (
            <div key={widget.id || i} className="bg-white rounded shadow p-6">
              <h3 className="text-lg font-semibold mb-4">{widget.title}</h3>
              <div className="h-80">
                {widget.type === 'bar' && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={widget.data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey={widget.xKey || 'name'} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {widget.bars?.map((bar, i) => (
                        <Bar key={i} dataKey={bar.key} fill={bar.color || COLORS[i % COLORS.length]} />
                      ))}
                    </BarChart>
                  </ResponsiveContainer>
                )}

                {widget.type === 'pie' && (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={widget.data} dataKey={widget.valueKey || 'value'} cx="50%" cy="50%" outerRadius={80} label>
                        {widget.data.map((entry, i) => (
                          <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                )}

                {widget.type === 'line' && (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={widget.data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey={widget.xKey || 'name'} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {widget.lines?.map((line, i) => (
                        <Line key={i} type="monotone" dataKey={line.key} stroke={line.color || COLORS[i % COLORS.length]} />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                )}

                {widget.type === 'area' && (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={widget.data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey={widget.xKey || 'name'} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {widget.areas?.map((area, i) => (
                        <Area key={i} type="monotone" dataKey={area.key} fill={area.color || COLORS[i % COLORS.length]} />
                      ))}
                    </AreaChart>
                  </ResponsiveContainer>
                )}

                {widget.type === 'list' && (
                  <ul className="space-y-2 max-h-80 overflow-y-auto">
                    {widget.data.map((item, i) => (
                      <li key={i} className="flex justify-between text-sm text-gray-700">
                        <span>{item.name || item.label}</span>
                        <span>{item.value}</span>
                      </li>
                    ))}
                  </ul>
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

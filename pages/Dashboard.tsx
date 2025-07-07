import React, { useEffect, useState } from 'react';
import type { DashboardResponse } from '../types/dashboard';

const Dashboard = () => {
  const [data, setData] = useState<DashboardResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/energy-analysis', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            hvac_inefficiencies: [],
            maintenance_priorities: [],
            energy_optimization_insights: {
              hvac_inefficiencies: [],
              maintenance_priorities: [],
            },
          }),
        });

        if (!res.ok) throw new Error('Failed to fetch dashboard data');

        const json = await res.json();
        console.log('API response:', json); // ✅ This should now log
        setData(json);
      } catch (error) {
        console.error('Dashboard fetch error:', error);
      }
    };

    fetchData();
  }, []);

  if (!data) return <p>Loading dashboard...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{data.title}</h1>
      <p className="text-gray-600 mb-4">{data.subtitle}</p>
      <p className="text-gray-500 text-sm mb-6">Last updated: {data.summary.lastUpdated}</p>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white rounded shadow">
          <p className="text-lg font-semibold">Total Equipment</p>
          <p>{data.summary.totalEquipment}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <p className="text-lg font-semibold">Critical Issues</p>
          <p>{data.summary.criticalIssues}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <p className="text-lg font-semibold">Outdoor Temp</p>
          <p>{data.summary.outdoorTemp}°C</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">AI-Powered Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.quickActions.map((qa) => (
            <div key={qa.id} className="bg-orange-100 p-4 rounded shadow">
              <h3 className="text-md font-bold text-orange-800">{qa.title}</h3>
              <p className="text-sm text-gray-700 mt-1">{qa.description}</p>
              <p className="text-xs text-gray-500 mt-2">Priority: {qa.priority}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">System Alerts</h2>
        <div className="space-y-3">
          {data.alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded shadow ${
                alert.severity === 'high'
                  ? 'bg-red-100'
                  : alert.severity === 'medium'
                  ? 'bg-yellow-100'
                  : 'bg-blue-100'
              }`}
            >
              <h4 className="font-semibold">{alert.title}</h4>
              <p className="text-sm text-gray-700 mt-1">{alert.description}</p>
              <p className="text-xs text-gray-500 mt-2">
                Equipment: {alert.equipment} | Severity: {alert.severity}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Widgets */}
      <div className="mb-6 border-4 border-green-500 p-4">
        <h2 className="text-xl font-semibold mb-2">Status Widgets</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {data.widgets.map((widget) => (
            <div key={widget.id} className="bg-white p-4 rounded shadow">
              <p className="text-sm font-semibold text-gray-600">{widget.title}</p>
              <p className="text-2xl font-bold text-gray-800">
                {widget.value}
                {widget.unit ? ` ${widget.unit}` : ''}
              </p>
            </div>
          ))}
        </div>
      </div>
  );
};

export default Dashboard;

import React, { useEffect, useState } from 'react';

import type { DashboardResponse } from './api/energy-analysis';

const fetchDashboardData = async (): Promise<DashboardResponse> => {
  const res = await fetch('/api/energy-analysis', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });
  if (!res.ok) throw new Error('Failed to fetch dashboard data');
  return res.json();
};

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData()
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{data.title}</h1>
      <p className="text-sm text-gray-500 mb-6">{data.subtitle}</p>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {Object.entries(data.summary).map(([key, value]) => (
          <div key={key} className="bg-white shadow p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-500">
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">AI-Powered Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.quickActions.map((qa) => (
            <div key={qa.id} className="bg-orange-100 p-4 rounded shadow">
              <h3 className="text-md font-bold text-orange-800">{qa.label}</h3>
              <p className="text-sm text-gray-700 mt-1">{qa.action}</p>
              <p className="text-xs text-gray-500 mt-2">Equipment: {qa.equipment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">AI-Suggested Alerts</h2>
        <div className="space-y-3">
          {data.alerts.map((alert) => (
            <div key={alert.id} className={`p-4 rounded shadow ${alert.type === 'error' ? 'bg-red-100' : alert.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'}`}>
              <h4 className="font-semibold">{alert.message}</h4>
              <p className="text-sm text-gray-700 mt-1">
                Equipment: {alert.equipment} | Severity: {alert.severity}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Widgets */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Widgets</h2>
        {data.widgets.map(widget => (
          <div key={widget.id} className="bg-white p-4 rounded shadow mb-4">
            <h3 className="text-lg font-bold mb-2">{widget.title}</h3>
            {widget.type === 'maintenance' && (
              <ul className="list-disc list-inside text-sm text-gray-700">
                {widget.data.items.map((item: any, i: number) => (
                  <li key={i}>
                    <strong>{item.priority}:</strong> {item.action} ({item.equipment})
                  </li>
                ))}
              </ul>
            )}
            {widget.type === 'issues' && (
              <ul className="list-disc list-inside text-sm text-gray-700">
                {widget.data.items.map((item: any, i: number) => (
                  <li key={i}>
                    <strong>{item.issue}</strong> ({item.severity}) — {item.impact}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

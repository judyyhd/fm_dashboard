import { useEffect, useState } from 'react';
import type { DashboardResponse } from '../types/dashboard';

export default function Dashboard() {
  const [data, setData] = useState<DashboardResponse | null>(null);

  useEffect(() => {
    fetch('/api/energy-analysis', { method: 'POST' })
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold">{data.title}</h1>
        <p className="text-gray-600">{data.subtitle}</p>
        <p className="text-sm text-gray-500">Last updated: {data.summary.lastUpdated}</p>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold">Quick Actions</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.quickActions.map((qa) => (
            <li key={qa.id} className="bg-white border p-4 rounded shadow">
              <p className="font-medium">{qa.title}</p>
              <p className="text-sm">{qa.description}</p>
              <p className="text-xs text-blue-500">Priority: {qa.priority}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Alerts */}
      <div>
        <h2 className="text-lg font-semibold">Alerts</h2>
        <ul className="space-y-2">
          {data.alerts.map((alert) => (
            <li
              key={alert.id}
              className="border-l-4 bg-gray-50 p-3"
              style={{
                borderColor:
                  alert.severity === 'high'
                    ? 'red'
                    : alert.severity === 'medium'
                    ? 'orange'
                    : 'blue',
              }}
            >
              <strong>{alert.title}</strong>
              <p className="text-sm">{alert.description}</p>
              <p className="text-xs text-gray-600">
                Equipment: {alert.equipment} • Severity: {alert.severity}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

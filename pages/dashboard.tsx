import React, { useEffect, useState } from 'react'
import type { DashboardResponse } from '../types/dashboard'

const Dashboard = () => {
  const [data, setData] = useState<DashboardResponse | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/energy-analysis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            hvac_inefficiencies: [],
            maintenance_priorities: [],
            energy_optimization_insights: {
              hvac_inefficiencies: [],
              maintenance_priorities: []
            }
          })
        })

        if (!res.ok) throw new Error('Failed to fetch dashboard data')

        const json = await res.json()
        console.log('API response:', json)
        setData(json)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  if (!data) return <p>Loading dashboard...</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{data.title}</h1>
      <p className="text-gray-600 mb-1">{data.subtitle}</p>
      <p className="text-gray-400 text-sm mb-4">Last updated: {data.summary.lastUpdated}</p>

      {/* Widgets - NOW AT THE TOP */}
      <div className="mb-6 bg-gray-100 p-4 rounded shadow border border-gray-300">
        <h2 className="text-xl font-semibold mb-2">Status Widgets</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
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
    </div>
  )
}

export default Dashboard

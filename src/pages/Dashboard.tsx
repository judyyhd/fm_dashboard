import React from 'react';
import QuickActions from '../components/dashboard/QuickActions';
import AlertsPanel from '../components/dashboard/AlertsPanel';
import KpiCards from '../components/dashboard/KpiCards';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
const workOrderData = [{
  name: 'HVAC',
  value: 24
}, {
  name: 'Plumbing',
  value: 18
}, {
  name: 'Electrical',
  value: 15
}, {
  name: 'Structural',
  value: 8
}, {
  name: 'Other',
  value: 12
}];
const maintenanceData = [{
  name: 'Jan',
  preventive: 65,
  corrective: 35
}, {
  name: 'Feb',
  preventive: 59,
  corrective: 48
}, {
  name: 'Mar',
  preventive: 80,
  corrective: 40
}, {
  name: 'Apr',
  preventive: 81,
  corrective: 39
}, {
  name: 'May',
  preventive: 76,
  corrective: 48
}, {
  name: 'Jun',
  preventive: 85,
  corrective: 37
}];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
const Dashboard = () => {
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Facility Dashboard</h1>
        <div className="flex space-x-2">
          <select className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
            <option>All Buildings</option>
            <option>Building A</option>
            <option>Building B</option>
            <option>Building C</option>
          </select>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-medium">
            Export
          </button>
        </div>
      </div>
      <QuickActions />
      <AlertsPanel />
      <div>
        <KpiCards />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Maintenance Activity
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={maintenanceData} margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5
            }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="preventive" stackId="a" fill="#3b82f6" name="Preventive" />
                <Bar dataKey="corrective" stackId="a" fill="#ef4444" name="Corrective" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Work Orders by Type
          </h2>
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={workOrderData} cx="50%" cy="50%" labelLine={true} outerRadius={80} fill="#8884d8" dataKey="value" label={({
                name,
                percent
              }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {workOrderData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>;
};
export default Dashboard;
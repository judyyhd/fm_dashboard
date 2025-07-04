import React from 'react';
import { TrendingUpIcon, TrendingDownIcon, ZapIcon, CheckCircleIcon, AlertCircleIcon } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const energyData = [{
  name: 'Jan',
  value: 2400
}, {
  name: 'Feb',
  value: 1398
}, {
  name: 'Mar',
  value: 9800
}, {
  name: 'Apr',
  value: 3908
}, {
  name: 'May',
  value: 4800
}, {
  name: 'Jun',
  value: 3800
}, {
  name: 'Jul',
  value: 4300
}];
const KpiCards = () => {
  const kpis = [{
    id: 1,
    title: 'Energy Consumption',
    value: '86.2 kWh',
    change: '-12%',
    trend: 'down',
    chart: true,
    icon: <ZapIcon className="h-5 w-5 text-amber-500" />
  }, {
    id: 2,
    title: 'Asset Status',
    value: '94%',
    change: '+2%',
    trend: 'up',
    icon: <CheckCircleIcon className="h-5 w-5 text-green-500" />
  }, {
    id: 3,
    title: 'IoT Devices',
    value: '128/130',
    change: '2 offline',
    trend: 'neutral',
    icon: <AlertCircleIcon className="h-5 w-5 text-blue-500" />
  }, {
    id: 4,
    title: 'Maintenance Tickets',
    value: '24',
    change: '+5',
    trend: 'up',
    icon: <div className="h-5 w-5 text-purple-500" />
  }];
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {kpis.map(kpi => <div key={kpi.id} className="bg-white rounded-lg shadow p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">{kpi.title}</p>
              <p className="text-2xl font-semibold text-gray-800 mt-1">
                {kpi.value}
              </p>
            </div>
            <div className="p-2 rounded-full bg-gray-100">{kpi.icon}</div>
          </div>
          <div className="flex items-center mt-4">
            {kpi.trend === 'up' ? <TrendingUpIcon className="h-4 w-4 text-green-500 mr-1" /> : kpi.trend === 'down' ? <TrendingDownIcon className="h-4 w-4 text-green-500 mr-1" /> : null}
            <span className={`text-sm ${kpi.trend === 'up' && !kpi.title.includes('Tickets') ? 'text-green-600' : kpi.trend === 'down' && kpi.title.includes('Energy') ? 'text-green-600' : kpi.trend === 'up' && kpi.title.includes('Tickets') ? 'text-amber-600' : 'text-gray-600'}`}>
              {kpi.change}
            </span>
          </div>
          {kpi.chart && <div className="h-16 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={energyData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="value" stroke="#3b82f6" fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>}
        </div>)}
    </div>;
};
export default KpiCards;
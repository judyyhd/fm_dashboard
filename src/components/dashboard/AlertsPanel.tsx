import React from 'react';
import { AlertTriangleIcon, LightbulbIcon, ThumbsUpIcon, XIcon, ArrowDownIcon } from 'lucide-react';
const AlertsPanel = () => {
  const alerts = [{
    id: 1,
    type: 'warning',
    title: 'HVAC System Warning',
    message: 'Building A HVAC system showing irregular temperature patterns. Maintenance inspection recommended.',
    icon: <AlertTriangleIcon className="h-5 w-5 text-amber-500" />,
    color: 'border-l-amber-500 bg-amber-50'
  }, {
    id: 2,
    type: 'suggestion',
    title: 'Energy Saving Opportunity',
    message: 'Lighting usage in West Wing indicates potential for 15% energy savings with scheduled dimming.',
    icon: <LightbulbIcon className="h-5 w-5 text-blue-500" />,
    color: 'border-l-blue-500 bg-blue-50'
  }, {
    id: 3,
    type: 'positive',
    title: 'Preventive Maintenance Success',
    message: 'Recent elevator maintenance has reduced failure incidents by 40% compared to last quarter.',
    icon: <ThumbsUpIcon className="h-5 w-5 text-green-500" />,
    color: 'border-l-green-500 bg-green-50'
  }];
  return <div className="bg-white rounded-lg shadow p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-800">
          AI-Suggested Alerts
        </h2>
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            <label htmlFor="priority" className="text-sm text-gray-600 mr-2">
              Order by:
            </label>
            <select id="priority" className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
              <option value="newest">Newest</option>
              <option value="highest">Highest Priority</option>
              <option value="lowest">Lowest Priority</option>
              <option value="type">Alert Type</option>
            </select>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-800">
            View all
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {alerts.map(alert => <div key={alert.id} className={`p-3 border-l-4 rounded-r-md ${alert.color} relative h-full`}>
            <div className="flex flex-col h-full">
              <div className="flex items-start mb-2">
                <div className="flex-shrink-0 mr-2">{alert.icon}</div>
                <h3 className="text-sm font-medium text-gray-900 pr-6">
                  {alert.title}
                </h3>
                <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
                  <XIcon className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm text-gray-600">{alert.message}</p>
            </div>
          </div>)}
      </div>
    </div>;
};
export default AlertsPanel;
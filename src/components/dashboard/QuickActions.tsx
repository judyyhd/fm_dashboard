import React, { useState } from 'react';
import { ZapIcon, ClipboardCheckIcon, ActivityIcon, BarChart2Icon, XIcon, CheckIcon, BookmarkIcon, AlertTriangleIcon, ChevronRightIcon, ArrowRightIcon, CheckCircleIcon } from 'lucide-react';
const QuickActions = () => {
  const [activeAction, setActiveAction] = useState(null);
  const [isImplementing, setIsImplementing] = useState(false);
  const actions = [{
    id: 1,
    name: 'Optimize Energy Usage',
    description: 'Analyze consumption patterns and get AI recommendations for efficiency improvements',
    icon: <ZapIcon className="h-5 w-5" />,
    color: 'bg-amber-500 hover:bg-amber-600',
    recommendations: ['Adjust HVAC schedules in Building A (save ~12% energy)', 'Replace lighting in floors 2-4 with LED alternatives', 'Implement motion sensors in low-traffic areas', 'Reduce server room cooling by 2°C during non-peak hours'],
    savings: '$8,450 annually',
    implementation: '2-3 weeks'
  }, {
    id: 2,
    name: 'Resolve Faulty Assets',
    description: 'Identify equipment with predicted failures and organize maintenance',
    icon: <div className="h-5 w-5" />,
    color: 'bg-red-500 hover:bg-red-600',
    recommendations: ['HVAC unit 4B showing irregular patterns (schedule inspection)', 'Elevator 2 in Building C reporting increased power draw', 'Water pump P3 has exceeded maintenance interval by 45 days', 'Security camera in Parking Level 2 intermittently offline'],
    savings: 'Prevent ~$23,000 in emergency repairs',
    implementation: '1-2 weeks'
  }, {
    id: 3,
    name: 'Plan Upcoming Inspections',
    description: 'Schedule required compliance inspections and preventive maintenance',
    icon: <ClipboardCheckIcon className="h-5 w-5" />,
    color: 'bg-green-500 hover:bg-green-600',
    recommendations: ['Fire safety inspection due in 14 days (Building A, B)', 'Elevator certification renewal needed by end of month', 'HVAC quarterly maintenance due for 8 units', 'Electrical system inspection required for compliance'],
    savings: 'Avoid compliance penalties and ensure safety',
    implementation: '4 weeks (staggered)'
  }, {
    id: 4,
    name: 'Run AI Diagnostic',
    description: 'Detect anomalies across building systems and identify improvement areas',
    icon: <ActivityIcon className="h-5 w-5" />,
    color: 'bg-blue-500 hover:bg-blue-600',
    recommendations: ['Energy usage spike detected in Building B (weekend hours)', 'Unusual occupancy patterns in East Wing (investigate)', 'Water consumption 32% above baseline in Building C', 'Temperature fluctuations in conference rooms (adjust sensors)'],
    savings: 'Potential issues identified early',
    implementation: 'Immediate analysis'
  }, {
    id: 5,
    name: 'Review Performance KPIs',
    description: 'Get AI-generated insights on facility management metrics',
    icon: <BarChart2Icon className="h-5 w-5" />,
    color: 'bg-purple-500 hover:bg-purple-600',
    recommendations: ['Work order completion time improved by 14% this quarter', 'Energy efficiency improved 8% year-over-year', 'Tenant satisfaction increased by 6 points (survey results)', 'Maintenance costs reduced by 11% compared to budget'],
    savings: 'Operational improvements identified',
    implementation: 'Ongoing tracking'
  }];
  const handleActionClick = action => {
    setActiveAction(action);
  };
  const handleImplement = () => {
    setIsImplementing(true);
    setTimeout(() => {
      setIsImplementing(false);
      setActiveAction(null);
    }, 1500);
  };
  const handleCloseAction = () => {
    setActiveAction(null);
  };
  return <div className="bg-white rounded-lg shadow">
      <div className="flex items-center justify-between p-5 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-800">
          AI-Powered Quick Actions
        </h2>
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
          <BookmarkIcon className="h-4 w-4 mr-1" /> Browse & Pin
        </button>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {actions.map(action => <button key={action.id} onClick={() => handleActionClick(action)} className={`${action.color} text-white rounded-md p-4 flex flex-col items-center text-center transition-all hover:shadow-lg`}>
              <div className="bg-white/20 p-3 rounded-full mb-3">
                {action.icon}
              </div>
              <span className="font-medium mb-1">{action.name}</span>
              <span className="text-xs text-white/80 mt-1 hidden md:block">
                {action.description.split(' ').slice(0, 4).join(' ')}...
              </span>
            </button>)}
        </div>
      </div>
      {activeAction && <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <div className="flex items-center">
                <div className={`${activeAction.color.split(' ')[0]} p-2 rounded-md text-white mr-3`}>
                  {activeAction.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  {activeAction.name}
                </h3>
              </div>
              <button onClick={handleCloseAction} className="text-gray-400 hover:text-gray-500">
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            {isImplementing ? <div className="p-8 flex flex-col items-center justify-center">
                <div className="mb-4 text-green-500">
                  <CheckCircleIcon className="h-16 w-16" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  Implementing Actions
                </h3>
                <p className="text-gray-500 text-center">
                  Your requested actions are being implemented. You'll receive
                  notifications as tasks are completed.
                </p>
              </div> : <>
                <div className="p-5">
                  <div className="mb-5">
                    <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                      AI Recommendations
                    </h4>
                    <div className="space-y-3">
                      {activeAction.recommendations.map((rec, index) => <div key={index} className="flex items-start p-3 bg-gray-50 rounded-md border border-gray-100">
                          <div className="flex-shrink-0 mt-0.5 mr-3 text-green-500">
                            <CheckIcon className="h-5 w-5" />
                          </div>
                          <div className="text-sm text-gray-700">{rec}</div>
                        </div>)}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                    <div className="bg-green-50 p-4 rounded-md border border-green-100">
                      <div className="text-sm font-medium text-green-800 mb-1">
                        Potential Impact
                      </div>
                      <div className="text-lg font-semibold text-green-700">
                        {activeAction.savings}
                      </div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                      <div className="text-sm font-medium text-blue-800 mb-1">
                        Implementation Timeline
                      </div>
                      <div className="text-lg font-semibold text-blue-700">
                        {activeAction.implementation}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-5 flex justify-between items-center border-t border-gray-200">
                  <button onClick={handleCloseAction} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
                    Review Later
                  </button>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
                      Adjust Plan
                    </button>
                    <button onClick={handleImplement} className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 flex items-center">
                      Implement All <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </>}
          </div>
        </div>}
    </div>;
};
export default QuickActions;
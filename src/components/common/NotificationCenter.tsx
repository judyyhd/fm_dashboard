import React from 'react';
import { BellIcon, XIcon, AlertTriangleIcon, CalendarIcon, ClockIcon } from 'lucide-react';
interface NotificationCenterProps {
  onClose: () => void;
}
const NotificationCenter: React.FC<NotificationCenterProps> = ({
  onClose
}) => {
  const notifications = [{
    id: 1,
    type: 'alert',
    title: 'HVAC System Alert',
    message: 'Unit #3 showing signs of failure. Maintenance recommended.',
    time: '10 min ago',
    icon: <AlertTriangleIcon className="h-5 w-5 text-amber-500" />
  }, {
    id: 2,
    type: 'reminder',
    title: 'Lease Renewal',
    message: 'Acme Corp lease expires in 30 days. Follow-up required.',
    time: '2 hours ago',
    icon: <CalendarIcon className="h-5 w-5 text-blue-500" />
  }, {
    id: 3,
    type: 'alert',
    title: 'Security Alert',
    message: 'Unauthorized access attempt at South Entrance.',
    time: '1 day ago',
    icon: <AlertTriangleIcon className="h-5 w-5 text-red-500" />
  }, {
    id: 4,
    type: 'reminder',
    title: 'Scheduled Inspection',
    message: 'Fire safety inspection scheduled for tomorrow at 10 AM.',
    time: '1 day ago',
    icon: <ClockIcon className="h-5 w-5 text-green-500" />
  }];
  return <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20 border border-gray-200">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center">
          <BellIcon className="h-5 w-5 text-gray-500 mr-2" />
          <h3 className="text-sm font-medium text-gray-700">Notifications</h3>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-600 focus:outline-none">
          <XIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
        {notifications.map(notification => <div key={notification.id} className="px-4 py-3 hover:bg-gray-50">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5">{notification.icon}</div>
              <div className="ml-3 w-0 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {notification.title}
                </p>
                <p className="text-sm text-gray-500">{notification.message}</p>
                <p className="mt-1 text-xs text-gray-400">
                  {notification.time}
                </p>
              </div>
            </div>
          </div>)}
      </div>
      <div className="px-4 py-3 bg-gray-50 text-xs text-center border-t border-gray-200">
        <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
          View all notifications
        </a>
      </div>
    </div>;
};
export default NotificationCenter;
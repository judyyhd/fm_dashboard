import React from 'react';
import { SaveIcon, UserIcon, BuildingIcon, BellIcon, ShieldIcon, DatabaseIcon } from 'lucide-react';
const Settings = () => {
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center">
          <SaveIcon className="h-4 w-4 mr-1" /> Save Changes
        </button>
      </div>
      <div className="bg-white rounded-lg shadow">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1 p-6 bg-gray-50 rounded-l-lg">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                User Management
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Configure user access and permissions for the facility
                management system.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2 p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Default User Role
                </label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                  <option>Viewer</option>
                  <option>Editor</option>
                  <option>Administrator</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Session Timeout (minutes)
                </label>
                <input type="number" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="30" defaultValue="30" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Two-Factor Authentication
                </label>
                <div className="mt-2">
                  <div className="flex items-center">
                    <input id="2fa-required" name="2fa" type="radio" defaultChecked className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300" />
                    <label htmlFor="2fa-required" className="ml-3 block text-sm font-medium text-gray-700">
                      Required for all users
                    </label>
                  </div>
                  <div className="flex items-center mt-2">
                    <input id="2fa-admin" name="2fa" type="radio" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300" />
                    <label htmlFor="2fa-admin" className="ml-3 block text-sm font-medium text-gray-700">
                      Required for administrators only
                    </label>
                  </div>
                  <div className="flex items-center mt-2">
                    <input id="2fa-optional" name="2fa" type="radio" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300" />
                    <label htmlFor="2fa-optional" className="ml-3 block text-sm font-medium text-gray-700">
                      Optional for all users
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1 p-6 bg-gray-50 rounded-l-lg">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Notification Settings
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Configure how and when notifications are sent to users.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2 p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Notifications
                </label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="email-work-orders" type="checkbox" defaultChecked className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="email-work-orders" className="font-medium text-gray-700">
                        Work Order Updates
                      </label>
                      <p className="text-gray-500">
                        Receive email notifications when work orders are
                        created, updated, or completed.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="email-maintenance" type="checkbox" defaultChecked className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="email-maintenance" className="font-medium text-gray-700">
                        Maintenance Alerts
                      </label>
                      <p className="text-gray-500">
                        Receive email notifications for scheduled maintenance
                        and inspections.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="email-security" type="checkbox" defaultChecked className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="email-security" className="font-medium text-gray-700">
                        Security Incidents
                      </label>
                      <p className="text-gray-500">
                        Receive email notifications for security incidents and
                        breaches.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Notification Frequency
                </label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                  <option>Immediately</option>
                  <option>Hourly Digest</option>
                  <option>Daily Digest</option>
                  <option>Weekly Digest</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1 p-6 bg-gray-50 rounded-l-lg">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                System Configuration
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Configure global system settings and defaults.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2 p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Default Currency
                </label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                  <option>CAD ($)</option>
                  <option>AUD ($)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date Format
                </label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                  <option>MM/DD/YYYY</option>
                  <option>DD/MM/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Maintenance Request Auto-Assignment
                </label>
                <div className="mt-2">
                  <div className="flex items-center">
                    <input id="auto-assign-yes" name="auto-assign" type="radio" defaultChecked className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300" />
                    <label htmlFor="auto-assign-yes" className="ml-3 block text-sm font-medium text-gray-700">
                      Enable automatic assignment based on expertise and
                      workload
                    </label>
                  </div>
                  <div className="flex items-center mt-2">
                    <input id="auto-assign-no" name="auto-assign" type="radio" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300" />
                    <label htmlFor="auto-assign-no" className="ml-3 block text-sm font-medium text-gray-700">
                      Disable automatic assignment (manual only)
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Data Retention Period (months)
                </label>
                <input type="number" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="36" defaultValue="36" />
                <p className="mt-1 text-sm text-gray-500">
                  Completed work orders and closed incidents older than this
                  will be archived.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Settings;
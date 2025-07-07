import React from 'react';
import { TrendingUpIcon, TrendingDownIcon, ThermometerIcon, UsersIcon, BuildingIcon, ZapIcon, WifiIcon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';

// Data structures for n8n agent to populate
interface SummaryStats {
  averageTemperature: {
    value: number;
    unit: string;
    change: string;
    trend: 'up' | 'down';
  };
  averageOccupancy: {
    value: number;
    unit: string;
    change: string;
    trend: 'up' | 'down';
  };
  energyEfficiency: {
    value: number;
    unit: string;
    change: string;
    trend: 'up' | 'down';
  };
  totalIoT: {
    value: number;
    online: number;
  };
}

interface MonthlyData {
  month: string;
  indoor: number;
  outdoor: number;
  occupancy: number;
}

interface BuildingData {
  name: string;
  temperature: number;
  occupancy: number;
}

interface HourlyData {
  hour: string;
  temperature: number;
  occupancy: number;
}

interface OptimizationRecommendation {
  id: string;
  text: string;
}

interface RealTimeDataProps {
  summaryStats: SummaryStats;
  monthlyTrends: MonthlyData[];
  buildingComparison: BuildingData[];
  hourlyData: HourlyData[];
  recommendations: OptimizationRecommendation[];
  viewType: 'daily' | 'weekly' | 'monthly';
}

const RealTimeData = () => {
  // This data will be populated by your n8n agent
  // ID: realtime-data
  const realtimeData: RealTimeDataProps = {
    summaryStats: {
      averageTemperature: {
        value: 73.2,
        unit: '°F',
        change: '+1.2° vs last month',
        trend: 'up'
      },
      averageOccupancy: {
        value: 72,
        unit: '%',
        change: '+5% vs last month',
        trend: 'up'
      },
      energyEfficiency: {
        value: 86,
        unit: '%',
        change: '+3% vs last year',
        trend: 'up'
      },
      totalIoT: {
        value: 130,
        online: 128
      }
    },
    monthlyTrends: [
      { month: 'Jan', indoor: 72, outdoor: 38, occupancy: 65 },
      { month: 'Feb', indoor: 73, outdoor: 42, occupancy: 68 },
      { month: 'Mar', indoor: 72, outdoor: 53, occupancy: 72 },
      { month: 'Apr', indoor: 74, outdoor: 62, occupancy: 70 },
      { month: 'May', indoor: 75, outdoor: 72, occupancy: 75 },
      { month: 'Jun', indoor: 76, outdoor: 82, occupancy: 78 }
    ],
    buildingComparison: [
      { name: 'Building A', temperature: 72.5, occupancy: 85 },
      { name: 'Building B', temperature: 73.2, occupancy: 78 },
      { name: 'Building C', temperature: 71.8, occupancy: 65 },
      { name: 'Building D', temperature: 74.1, occupancy: 42 }
    ],
    hourlyData: [
      { hour: '6am', temperature: 70.2, occupancy: 15 },
      { hour: '8am', temperature: 71.5, occupancy: 45 },
      { hour: '10am', temperature: 73.1, occupancy: 82 },
      { hour: '12pm', temperature: 74.2, occupancy: 85 },
      { hour: '2pm', temperature: 74.3, occupancy: 82 },
      { hour: '4pm', temperature: 73.6, occupancy: 72 },
      { hour: '6pm', temperature: 72.5, occupancy: 40 }
    ],
    recommendations: [
      {
        id: '1',
        text: 'Adjust Building C temperature settings by 1.5°F to match occupancy patterns, potentially saving 8-10% on energy costs.'
      },
      {
        id: '2', 
        text: 'Implement temperature setbacks during low occupancy periods in Building D to reduce energy consumption by up to 15%.'
      },
      {
        id: '3',
        text: 'Consider installing smart thermostats in Building B to better respond to occupancy fluctuations.'
      }
    ],
    viewType: 'daily'
  };

  const renderTrendIcon = (trend: 'up' | 'down') => {
    return trend === 'up' ? 
      <TrendingUpIcon className="h-4 w-4 text-green-500 mr-1" /> :
      <TrendingDownIcon className="h-4 w-4 text-green-500 mr-1" />;
  };

  const renderEmptyChart = (message: string) => (
    <div className="h-full flex items-center justify-center">
      <div className="text-center">
        <div className="text-gray-400 mb-2">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <p className="text-sm text-gray-500">{message}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <h1 className="text-2xl font-bold text-gray-900">Real-Time Data</h1>
        <div className="flex space-x-3">
          {/* View Type Selector - n8n agent can update */}
          {/* ID: view-type-selector */}
          <select 
            className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            data-field="viewType"
            defaultValue={realtimeData.viewType}
          >
            <option value="daily">Daily View</option>
            <option value="weekly">Weekly View</option>
            <option value="monthly">Monthly View</option>
          </select>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-medium flex items-center">
            Export Report
          </button>
        </div>
      </div>

      {/* Summary Cards - n8n agent should update these */}
      {/* ID: summary-stats-cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Average Temperature</p>
              <p className="text-2xl font-semibold text-gray-800 mt-1" data-field="averageTemperature">
                {realtimeData.summaryStats.averageTemperature.value}{realtimeData.summaryStats.averageTemperature.unit}
              </p>
            </div>
            <div className="p-2 rounded-full bg-blue-100 text-blue-600">
              <ThermometerIcon className="h-5 w-5" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            {renderTrendIcon(realtimeData.summaryStats.averageTemperature.trend)}
            <span className="text-sm text-green-600" data-field="temperatureChange">
              {realtimeData.summaryStats.averageTemperature.change}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Average Occupancy</p>
              <p className="text-2xl font-semibold text-gray-800 mt-1" data-field="averageOccupancy">
                {realtimeData.summaryStats.averageOccupancy.value}{realtimeData.summaryStats.averageOccupancy.unit}
              </p>
            </div>
            <div className="p-2 rounded-full bg-green-100 text-green-600">
              <UsersIcon className="h-5 w-5" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            {renderTrendIcon(realtimeData.summaryStats.averageOccupancy.trend)}
            <span className="text-sm text-green-600" data-field="occupancyChange">
              {realtimeData.summaryStats.averageOccupancy.change}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Energy Efficiency</p>
              <p className="text-2xl font-semibold text-gray-800 mt-1" data-field="energyEfficiency">
                {realtimeData.summaryStats.energyEfficiency.value}{realtimeData.summaryStats.energyEfficiency.unit}
              </p>
            </div>
            <div className="p-2 rounded-full bg-amber-100 text-amber-600">
              <ZapIcon className="h-5 w-5" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            {renderTrendIcon(realtimeData.summaryStats.energyEfficiency.trend)}
            <span className="text-sm text-green-600" data-field="efficiencyChange">
              {realtimeData.summaryStats.energyEfficiency.change}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total IoT</p>
              <p className="text-2xl font-semibold text-gray-800 mt-1" data-field="totalIoT">
                {realtimeData.summaryStats.totalIoT.value}
              </p>
            </div>
            <div className="p-2 rounded-full bg-purple-100 text-purple-600">
              <WifiIcon className="h-5 w-5" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <span className="text-sm text-gray-600" data-field="iotOnline">
              {realtimeData.summaryStats.totalIoT.online} online
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 space-y-6">
          
          {/* Monthly Trends Chart - n8n agent should update data */}
          {/* ID: monthly-trends-chart */}
          <div>
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              Temperature & Occupancy Trends (Monthly)
            </h2>
            <div className="h-80" data-content="monthly-trends">
              {realtimeData.monthlyTrends.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={realtimeData.monthlyTrends} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="indoor" name="Indoor Temp (°F)" stroke="#3b82f6" activeDot={{ r: 8 }} />
                    <Line yAxisId="left" type="monotone" dataKey="outdoor" name="Outdoor Temp (°F)" stroke="#ef4444" activeDot={{ r: 8 }} />
                    <Line yAxisId="right" type="monotone" dataKey="occupancy" name="Occupancy (%)" stroke="#10b981" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                renderEmptyChart("No monthly trend data available")
              )}
            </div>
          </div>

          {/* Building Comparison Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Temperature by Building - n8n agent should update data */}
            {/* ID: building-temperature-chart */}
            <div className="bg-gray-50 rounded-lg p-5">
              <h3 className="text-md font-medium text-gray-800 mb-4">Temperature by Building</h3>
              <div className="h-64" data-content="building-temperature">
                {realtimeData.buildingComparison.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={realtimeData.buildingComparison} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[70, 75]} />
                      <Tooltip formatter={value => `${value}°F`} />
                      <Bar dataKey="temperature" name="Avg. Temperature (°F)" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  renderEmptyChart("No building temperature data")
                )}
              </div>
            </div>

            {/* Occupancy by Building - n8n agent should update data */}
            {/* ID: building-occupancy-chart */}
            <div className="bg-gray-50 rounded-lg p-5">
              <h3 className="text-md font-medium text-gray-800 mb-4">Occupancy by Building</h3>
              <div className="h-64" data-content="building-occupancy">
                {realtimeData.buildingComparison.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={realtimeData.buildingComparison} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip formatter={value => `${value}%`} />
                      <Bar dataKey="occupancy" name="Occupancy (%)" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  renderEmptyChart("No building occupancy data")
                )}
              </div>
            </div>
          </div>

          {/* Hourly Data Chart - n8n agent should update data */}
          {/* ID: hourly-trends-chart */}
          <div>
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              Today's Temperature & Occupancy (Hourly)
            </h2>
            <div className="h-80" data-content="hourly-trends">
              {realtimeData.hourlyData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={realtimeData.hourlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis yAxisId="left" domain={[70, 75]} />
                    <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Area yAxisId="left" type="monotone" dataKey="temperature" name="Temperature (°F)" stroke="#3b82f6" fill="#93c5fd" />
                    <Area yAxisId="right" type="monotone" dataKey="occupancy" name="Occupancy (%)" stroke="#10b981" fill="#a7f3d0" />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                renderEmptyChart("No hourly data available for today")
              )}
            </div>
          </div>

          {/* AI Recommendations - n8n agent should update recommendations */}
          {/* ID: optimization-recommendations */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5" data-content="recommendations">
            <div className="flex items-start">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                <ZapIcon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">
                  Temperature Optimization Recommendations
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Based on our analysis of your temperature and occupancy data, we recommend the following actions:
                </p>
                {realtimeData.recommendations.length > 0 ? (
                  <ul className="mt-4 space-y-3">
                    {realtimeData.recommendations.map((rec) => (
                      <li key={rec.id} className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-green-500 mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-700">{rec.text}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="mt-4 text-center py-4">
                    <p className="text-sm text-gray-500">No optimization recommendations available at this time</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeData;
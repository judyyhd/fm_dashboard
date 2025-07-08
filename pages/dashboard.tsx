import React, { useEffect, useState } from 'react';
import { Zap, Shield, Wrench, Boxes } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Fetch dashboard data from API
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        console.log('Fetching dashboard data...');
        
        const response = await fetch('/api/energy-analysis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}) // Empty body - n8n will generate everything
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Dashboard data received:', data);
        
        setDashboardData(data);
        setLastUpdated(new Date().toLocaleString());
        
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchDashboardData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading facility data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️ Error</div>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // No data state
  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No dashboard data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* Dynamic Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {dashboardData.title || 'Facility Dashboard'}
          </h1>
          {dashboardData.subtitle && (
            <p className="text-gray-600 mt-1">{dashboardData.subtitle}</p>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {lastUpdated && (
            <span className="text-sm text-gray-500">
              Last updated: {lastUpdated}
            </span>
          )}
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Dynamic Summary Cards */}
      {dashboardData.summary && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {Object.entries(dashboardData.summary).map(([key, value], index) => {
            // Define icons for each card type
            const getIcon = (key, index) => {
              if (key.toLowerCase().includes('equipment')) return <Boxes size={18} />;
              if (key.toLowerCase().includes('energy')) return <Zap size={18} />;
              if (key.toLowerCase().includes('critical') || key.toLowerCase().includes('issues')) return <Shield size={18} />;
              if (key.toLowerCase().includes('maintenance')) return <Wrench size={18} />;
              // Default icons based on position
              const icons = [<Boxes size={18} />, <Shield size={18} />, <Zap size={18} />, <Wrench size={18} />];
              return icons[index % icons.length];
            };

            const getIconStyle = (key, index) => {
              if (key.toLowerCase().includes('equipment')) return 'card-icon equipment';
              if (key.toLowerCase().includes('energy')) return 'card-icon energy'; 
              if (key.toLowerCase().includes('critical') || key.toLowerCase().includes('issues')) return 'card-icon critical';
              if (key.toLowerCase().includes('maintenance')) return 'card-icon maintenance';
              // Default styles based on position
              const styles = ['card-icon equipment', 'card-icon critical', 'card-icon energy', 'card-icon maintenance'];
              return styles[index % styles.length];
            };

            return (
              <div key={key} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start" style={{ gap: '1rem' }}>
                    <div className={getIconStyle(key, index)}>
                      {getIcon(key, index)}
                    </div>
                    <h3 className="text-xs font-medium text-gray-600 uppercase tracking-wider leading-tight">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </h3>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{value}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Dynamic Quick Actions - Updated to use agent's structure */}
      {dashboardData.quickActions && dashboardData.quickActions.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">AI-Powered Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dashboardData.quickActions.map((action, index) => (
              <div 
                key={action.id || index} 
                className="p-6 rounded-lg border border-gray-200 bg-white cursor-pointer transition-colors hover:bg-gray-50"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-gray-900 flex-1 pr-2">{action.title}</h3>
                  {action.priority && (
                    <span className={`px-2 py-0.5 text-sm font-bold rounded whitespace-nowrap flex-shrink-0 ${
                      action.priority === 'high' ? 'bg-red-100 text-red-800' :
                      action.priority === 'medium' ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {action.priority === 'medium' ? 'medium' : action.priority}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{action.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

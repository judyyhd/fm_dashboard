import React, { useEffect, useState } from 'react';
import { Shield, Boxes, Zap, Wrench, AlertTriangle, Thermometer } from 'lucide-react';
import { ErrorBoundary } from 'react-error-boundary';

interface DashboardData {
  summary: {
    status: {
      level: string;
      message: string;
      confidence: string;
    };
    metrics: {
      total_issues: number;
      critical_issues: number;
      potential_savings: {
        value: number;
        description: string;
      };
    };
    key_message: string;
  };
  priority_alerts: Array<{
    id: string;
    severity: string;
    title: string;
    description: string;
    action: string;
  }>;
  business_impact: {
    energy_savings: {
      immediate: string;
      short_term: string;
      long_term: string;
    };
    comfort: {
      severity: string;
    };
  };
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch('/api/dashboard', {
          method: 'POST'
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  if (!data) {
    return null;
  }

  const summaryData = {
    'Total Issues': data.summary.metrics.total_issues,
    'Critical Issues': data.summary.metrics.critical_issues, 
    'Energy Savings': `${data.summary.metrics.potential_savings.value}%`,
    'Comfort Level': data.business_impact.comfort.severity
  };

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {Object.entries(summaryData).map(([key, value], index) => {
            const getIcon = (key: string, index: number) => {
              if (key.toLowerCase().includes('equipment')) return <Boxes size={18} />;
              if (key.toLowerCase().includes('energy')) return <Zap size={18} />;
              if (key.toLowerCase().includes('critical') || key.toLowerCase().includes('issues')) return <Shield size={18} />;
              if (key.toLowerCase().includes('maintenance')) return <Wrench size={18} />;
              const icons = [<Boxes size={18} />, <Shield size={18} />, <Zap size={18} />, <Wrench size={18} />];
              return icons[index % icons.length];
            };

            const getIconStyle = (key: string, index: number) => {
              if (key.toLowerCase().includes('equipment')) return 'card-icon equipment';
              if (key.toLowerCase().includes('energy')) return 'card-icon energy';
              if (key.toLowerCase().includes('critical') || key.toLowerCase().includes('issues')) return 'card-icon critical';
              if (key.toLowerCase().includes('maintenance')) return 'card-icon maintenance';
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

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Priority Alerts</h2>
          <div className="grid grid-cols-1 gap-4">
            {data.priority_alerts.map(alert => (
              <div key={alert.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle size={18} className="text-red-500" />
                  <h3 className="font-medium">{alert.title}</h3>
                </div>
                <p className="text-gray-600">{alert.description}</p>
                <p className="text-sm font-medium mt-2">Action: {alert.action}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-4">Energy Savings Impact</h2>
            <div className="space-y-2">
              <p>Immediate: {data.business_impact.energy_savings.immediate}</p>
              <p>Short Term: {data.business_impact.energy_savings.short_term}</p>
              <p>Long Term: {data.business_impact.energy_savings.long_term}</p>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Dashboard;
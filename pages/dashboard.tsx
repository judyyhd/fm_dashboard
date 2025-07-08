import { FC, useEffect, useState } from 'react';
import { Shield, Boxes, Zap, Wrench, AlertTriangle, Thermometer } from 'lucide-react';
import axios from 'axios';

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

const Dashboard: FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/dashboard');
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch dashboard data');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;
  if (!data) return null;

  const summaryData = {
    'Total Equipment Issues': data.summary.metrics.total_issues,
    'Critical Issues': data.summary.metrics.critical_issues, 
    'Energy Savings Potential': `${data.summary.metrics.potential_savings.value}%`,
    'System Status': data.summary.status.level
  };

  return (
    <div className="p-8">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Priority Alerts</h2>
          <div className="space-y-4">
            {data.priority_alerts.map(alert => (
              <div key={alert.id} className="flex items-start gap-4 p-4 bg-red-50 rounded-lg">
                <div className="p-2 bg-red-100 rounded-full">
                  <AlertTriangle size={20} className="text-red-600" />
                </div>
                <div>
                  <h3 className="font-medium">{alert.title}</h3>
                  <p className="text-sm text-gray-600">{alert.description}</p>
                  <p className="text-sm font-medium text-red-600 mt-2">{alert.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Business Impact</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Immediate Savings</p>
                <p className="text-lg font-medium">{data.business_impact.energy_savings.immediate}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Long Term Savings</p>
                <p className="text-lg font-medium">{data.business_impact.energy_savings.long_term}</p>
              </div>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <p className="text-sm text-gray-600">Comfort Impact</p>
              <p className="text-lg font-medium">{data.business_impact.comfort.severity}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
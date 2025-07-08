import { useState, useEffect } from 'react';
import { Boxes, Shield, Zap, Wrench, AlertTriangle, Thermometer, Clock } from 'lucide-react';

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
    timeline: string;
  }>;
  action_plan: {
    immediate: { actions: Array<{
      priority: number;
      description: string;
      timeline: string;
    }>};
    today: { actions: Array<{
      priority: number;
      description: string;
      timeline: string;
    }>};
  };
  business_impact: {
    energy_savings: {
      immediate: string;
      short_term: string;
    };
    comfort: {
      severity: string;
    };
  };
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/dashboard', {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Failed to fetch dashboard data');
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;
  if (!data) return null;

  const summaryData = {
    'Total Equipment Issues': data.summary.metrics.total_issues,
    'Critical Issues': data.summary.metrics.critical_issues,
    'Energy Savings Potential': `${data.summary.metrics.potential_savings.value}%`,
    'Maintenance Actions': data.action_plan.immediate.actions.length + data.action_plan.today.actions.length
  };

  return (
    <div className="p-8">
      {/* Status Banner */}
      <div className={`mb-8 p-4 rounded-lg ${data.summary.status.level === 'critical' ? 'bg-red-100' : 'bg-yellow-100'}`}>
        <div className="flex items-center gap-2">
          <AlertTriangle size={20} className="text-red-600" />
          <span className="font-medium">{data.summary.status.message}</span>
        </div>
      </div>

      {/* Summary Cards Section */}
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

      {/* Priority Alerts */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Priority Alerts</h2>
        <div className="grid gap-4">
          {data.priority_alerts.map(alert => (
            <div key={alert.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center gap-3 mb-2">
                <Thermometer className="text-red-500" size={20} />
                <h3 className="font-medium">{alert.title}</h3>
              </div>
              <p className="text-gray-600 mb-2">{alert.description}</p>
              <div className="flex items-center gap-2 text-sm">
                <Clock size={16} />
                <span>{alert.timeline}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Plans */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-semibold mb-4">Immediate Actions</h2>
          <div className="bg-white rounded-lg shadow">
            {data.action_plan.immediate.actions.map((action, index) => (
              <div key={index} className="p-4 border-b last:border-b-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium">Priority {action.priority}</span>
                </div>
                <p className="text-gray-600">{action.description}</p>
                <span className="text-sm text-gray-500 mt-2 block">{action.timeline}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Business Impact</h2>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="mb-4">
              <h3 className="font-medium mb-2">Energy Savings</h3>
              <p>Immediate: {data.business_impact.energy_savings.immediate}</p>
              <p>Short Term: {data.business_impact.energy_savings.short_term}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Comfort Impact</h3>
              <p>Severity: {data.business_impact.comfort.severity}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
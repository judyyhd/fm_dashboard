import { FC, useEffect, useState } from 'react';
import { Boxes, Shield, Wrench, Zap, AlertTriangle, Thermometer, Clock } from 'lucide-react';

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
    timeline: string;
  }>;
  action_plan: {
    immediate: { actions: Array<any> };
    today: { actions: Array<any> };
    this_week: { actions: Array<any> };
  };
  business_impact: {
    energy_savings: {
      immediate: string;
      short_term: string;
      long_term: string;
    };
    comfort: {
      severity: string;
    };
    cost_benefit: string;
  };
}

const Dashboard: FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/equipment-analysis', {
          method: 'POST'
        });
        if (!response.ok) throw new Error('Failed to fetch data');
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;
  if (!data) return null;

  const summaryData = {
    'Total Issues': data.summary.metrics.total_issues,
    'Critical Issues': data.summary.metrics.critical_issues, 
    'Energy Savings': `${data.summary.metrics.potential_savings.value}%`,
    'Action Items': data.action_plan.immediate.actions.length + 
                   data.action_plan.today.actions.length +
                   data.action_plan.this_week.actions.length
  };

  return (
    <div className="p-8">
      {/* Status Banner */}
      <div className={`mb-8 p-4 rounded-lg bg-red-50 border border-red-200`}>
        <div className="flex items-center gap-2">
          <AlertTriangle className="text-red-500" size={20} />
          <h2 className="font-semibold text-red-700">{data.summary.status.message}</h2>
        </div>
        <p className="mt-2 text-red-600">{data.summary.key_message}</p>
      </div>

      {/* Summary Cards */}
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
                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                  {alert.severity}
                </span>
              </div>
              <p className="text-gray-600 mb-2">{alert.description}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock size={16} />
                <span>{alert.timeline}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Plan */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Action Plan</h2>
        <div className="grid gap-4">
          {Object.entries(data.action_plan).map(([timeframe, plan]) => (
            <div key={timeframe} className="bg-white rounded-lg shadow p-4">
              <h3 className="font-medium mb-3 capitalize">{timeframe}</h3>
              {plan.actions.map((action, i) => (
                <div key={i} className="flex items-start gap-3 mb-2">
                  <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                    {action.priority}
                  </div>
                  <div>
                    <p>{action.description}</p>
                    <p className="text-sm text-gray-500">{action.timeline}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Business Impact */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Business Impact</h2>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="grid gap-4">
            <div>
              <h3 className="font-medium mb-2">Energy Savings Potential</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-sm text-gray-500">Immediate</p>
                  <p className="font-bold">{data.business_impact.energy_savings.immediate}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Short Term</p>
                  <p className="font-bold">{data.business_impact.energy_savings.short_term}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Long Term</p>
                  <p className="font-bold">{data.business_impact.energy_savings.long_term}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">Cost-Benefit Analysis</h3>
              <p className="text-gray-600">{data.business_impact.cost_benefit}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
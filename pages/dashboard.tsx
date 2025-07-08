import React, { useEffect, useState } from 'react';
import { AlertTriangle, Thermometer, RefreshCw, Clock } from 'lucide-react';
import styles from './dashboard.module.css';

interface DashboardData {
  summary: {
    status: {
      level: string;
      icon: string;
      color: string;
      message: string;
      timestamp: string;
      confidence: string;
    };
    metrics: {
      total_issues: number;
      critical_issues: number;
      potential_savings: {
        value: number;
        unit: string;
        description: string;
      };
    };
    key_message: string;
  };
  priority_alerts: Array<{
    id: string;
    severity: string;
    icon: string;
    equipment: string[];
    title: string;
    description: string;
    action: string;
    timeline: string;
    impact: {
      business: string;
      savings?: string;
      benefit?: string;
      risk: string;
    };
    resources: {
      type: string;
      cost: string;
    };
  }>;
  action_plan: {
    immediate: { actions: Action[] };
    today: { actions: Action[] };
    this_week: { actions: Action[] };
  };
  insights: {
    patterns: Pattern[];
    trends: Trend[];
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
    risks: Risk[];
    cost_benefit: string;
  };
  resources: {
    internal_hours: number;
    contractor_needed: boolean;
    specialist_needed: boolean;
    estimated_cost: string;
    budget_approval: boolean;
    procurement: any[];
  };
  next_steps: {
    immediate: string;
    decisions: Decision[];
    follow_up: FollowUp[];
  };
}

interface Action {
  priority: number;
  description: string;
  equipment: string[];
  assigned_to: string;
  timeline: string;
  success_criteria: string;
}

interface Pattern {
  pattern: string;
  affected_equipment: string[];
  identified_by: string[];
  confidence: string;
  root_cause: string;
  solution: string;
}

interface Trend {
  trend: string;
  impact: string;
  recommendation: string;
}

interface Risk {
  risk: string;
  probability: string;
  consequence: string;
  mitigation: string;
}

interface Decision {
  topic: string;
  options: string[];
  recommendation: string;
  deadline: string;
}

interface FollowUp {
  action: string;
  timeline: string;
  responsible: string;
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/equipment-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }
      
      const result = await response.json();
      setData(result);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 300000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading dashboard data...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!data) {
    return <div className={styles.error}>No data available</div>;
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div className={styles.statusBar} style={{backgroundColor: data.summary.status.color}}>
          <AlertTriangle size={24} />
          <span>{data.summary.status.message}</span>
        </div>
        
        <div className={styles.refreshSection}>
          <button onClick={fetchData} className={styles.refreshButton}>
            <RefreshCw size={16} />
            Refresh
          </button>
          <div className={styles.timestamp}>
            <Clock size={16} />
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
        </div>
      </div>

      <div className={styles.summaryMetrics}>
        <div className={styles.metricCard}>
          <h3>Total Issues</h3>
          <div className={styles.metricValue}>{data.summary.metrics.total_issues}</div>
        </div>
        <div className={styles.metricCard}>
          <h3>Critical Issues</h3>
          <div className={styles.metricValue}>{data.summary.metrics.critical_issues}</div>
        </div>
        <div className={styles.metricCard}>
          <h3>Potential Savings</h3>
          <div className={styles.metricValue}>
            {data.summary.metrics.potential_savings.value}{data.summary.metrics.potential_savings.unit}
          </div>
        </div>
      </div>

      <div className={styles.alertsSection}>
        <h2>Priority Alerts</h2>
        {data.priority_alerts.map(alert => (
          <div key={alert.id} className={`${styles.alertCard} ${styles[alert.severity]}`}>
            <div className={styles.alertHeader}>
              <Thermometer size={20} />
              <h3>{alert.title}</h3>
            </div>
            <p>{alert.description}</p>
            <div className={styles.alertAction}>
              <strong>Action Required:</strong> {alert.action}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.actionsSection}>
        <h2>Action Plan</h2>
        {Object.entries(data.action_plan).map(([timeframe, plan]) => (
          <div key={timeframe} className={styles.actionTimeframe}>
            <h3>{timeframe.replace('_', ' ').toUpperCase()}</h3>
            {plan.actions.map((action, index) => (
              <div key={index} className={styles.actionItem}>
                <div className={styles.actionPriority}>P{action.priority}</div>
                <div className={styles.actionContent}>
                  <div>{action.description}</div>
                  <div className={styles.actionMeta}>
                    <span>Timeline: {action.timeline}</span>
                    <span>Assigned: {action.assigned_to}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className={styles.impactSection}>
        <h2>Business Impact</h2>
        <div className={styles.impactGrid}>
          <div className={styles.impactCard}>
            <h3>Energy Savings</h3>
            <ul>
              <li>Immediate: {data.business_impact.energy_savings.immediate}</li>
              <li>Short Term: {data.business_impact.energy_savings.short_term}</li>
              <li>Long Term: {data.business_impact.energy_savings.long_term}</li>
            </ul>
          </div>
          <div className={styles.impactCard}>
            <h3>Resources Required</h3>
            <p>Internal Hours: {data.resources.internal_hours}</p>
            <p>Estimated Cost: {data.resources.estimated_cost}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

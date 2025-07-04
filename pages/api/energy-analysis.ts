import { NextApiRequest, NextApiResponse } from 'next';

interface Equipment {
  id: string;
  status: string;
  temperature?: number;
}

interface HVACIssue {
  equipment: string;
  issue: string;
  severity: string;
  impact: string;
}

interface MaintenancePriority {
  equipment: string;
  priority: string;
  action: string;
}

interface Summary {
  total_recommendations: number;
  total_maintenance_items: number;
  critical_issues: number;
  high_priority_actions: number;
}

interface EnergyAnalysis {
  hvac_inefficiencies: HVACIssue[];
  maintenance_priorities: MaintenancePriority[];
  summary: Summary;
}

interface QuickAction {
  id: string;
  label: string;
  type: 'primary' | 'secondary' | 'warning' | 'danger';
  action: string;
}

interface Alert {
  id: string;
  title: string;
  message: string;
  type: 'critical' | 'warning' | 'success' | 'info';  // Changed from 'severity'
  timestamp: string;
  equipment?: string;
}

interface ChartDataPoint {
  name: string;
  count: number;
  color?: string;
}

interface Widget {
  id: string;
  type: 'bar' | 'pie' | 'line' | 'metrics' | 'list';
  title: string;
  data: ChartDataPoint[] | Record<string, string | number> | any[];
  xKey?: string;
  yKey?: string;
  bars?: Array<{key: string; name: string; color: string}>;
  lines?: Array<{key: string; name: string; color: string}>;
}

interface DashboardResponse {
  title: string;
  subtitle: string;
  summary: {
    criticalIssues: number;
    totalEquipment: number;
    maintenanceItems: number;
    highPriorityActions: number;
  };
  quickActions: QuickAction[];
  alerts: Alert[];
  widgets: Widget[];
}

function transformEnergyDataToDashboard(analysisData: EnergyAnalysis): DashboardResponse {
  const criticalCount = analysisData.maintenance_priorities.filter(p => p.priority === 'Critical').length;
  const highCount = analysisData.maintenance_priorities.filter(p => p.priority === 'High').length;
  const mediumCount = analysisData.maintenance_priorities.filter(p => p.priority === 'Medium').length;

  const uniqueEquipment = new Set([
    ...analysisData.hvac_inefficiencies.map(i => i.equipment),
    ...analysisData.maintenance_priorities.map(p => p.equipment)
  ]);

  const quickActions: QuickAction[] = [
    {
      id: 'repair-critical',
      label: 'Fix Critical HVAC Issues',
      type: 'danger',
      action: 'REPAIR_CRITICAL'
    },
    {
      id: 'adjust-temp',
      label: 'Adjust Temperature Settings',
      type: 'warning',
      action: 'ADJUST_TEMPERATURE'
    },
    {
      id: 'schedule-maintenance',
      label: 'Schedule Maintenance',
      type: 'primary',
      action: 'SCHEDULE_MAINTENANCE'
    }
  ];

  const alerts: Alert[] = [
    ...analysisData.hvac_inefficiencies.map((issue, index) => ({
      id: `alert-${index}`,
      title: `HVAC Issue Detected`,
      message: `${issue.equipment}: ${issue.issue}`,
      type: (issue.severity === 'high' ? 'critical' : 
            issue.severity === 'medium' ? 'warning' : 'info') as 'critical' | 'warning' | 'info',
      timestamp: new Date().toISOString(),
      equipment: issue.equipment
    })),
  ];
  const widgets: Widget[] = [
    {
      id: 'priority-distribution',
      type: 'bar',
      title: 'Maintenance Priority Distribution',
      data: [
        {name: 'Critical', count: criticalCount, color: '#ef4444'},
        {name: 'High', count: highCount, color: '#f97316'},
        {name: 'Medium', count: mediumCount, color: '#eab308'}
      ],
      xKey: 'name',
      bars: [{key: 'count', name: 'Equipment Count', color: '#3b82f6'}]
    },
    {
      id: 'maintenance-list',
      type: 'list',
      title: 'Maintenance Tasks',
      data: analysisData.maintenance_priorities.map(task => ({
        equipment: task.equipment,
        priority: task.priority,
        action: task.action
      }))
    },
    {
      id: 'system-metrics',
      type: 'metrics',
      title: 'System Overview',
      data: {
        'Total Equipment': uniqueEquipment.size,
        'Critical Issues': criticalCount,
        'High Priority': highCount,
        'Medium Priority': mediumCount
      }
    }
  ];

  return {
    title: 'Facility Energy Analysis Dashboard',
    subtitle: `${analysisData.hvac_inefficiencies.length} HVAC issues detected across ${uniqueEquipment.size} equipment`,
    summary: {
      criticalIssues: criticalCount,
      totalEquipment: uniqueEquipment.size,
      maintenanceItems: analysisData.summary.total_maintenance_items,
      highPriorityActions: highCount
    },
    quickActions,
    alerts,
    widgets
  };
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const analysisData = req.body as EnergyAnalysis;
    const dashboardData = transformEnergyDataToDashboard(analysisData);
    return res.status(200).json(dashboardData);
  } catch (error) {
    console.error('Dashboard generation error:', error);
    return res.status(500).json({ 
      error: 'Failed to generate dashboard data',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
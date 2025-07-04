// pages/api/energy-analysis.ts
import { NextApiRequest, NextApiResponse } from 'next';

// Interfaces
interface EquipmentIssue {
  equipment: string;
  issue: string;
  severity: 'high' | 'medium' | 'low';
  impact: string;
}

interface MaintenanceItem {
  equipment: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  action: string;
}

interface EnergyAnalysis {
  hvac_inefficiencies: EquipmentIssue[];
  maintenance_priorities: MaintenanceItem[];
  summary: {
    total_recommendations: number;
    total_maintenance_items: number;
    critical_issues: number;
    high_priority_actions: number;
  };
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  priority: number;
  actionType: 'repair' | 'adjust' | 'inspect' | 'optimize';
  equipment?: string;
}

interface Alert {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'warning' | 'info' | 'success';
  timestamp: string;
}

interface Widget {
  id: string;
  type: 'status' | 'list' | 'metrics' | 'chart';
  title: string;
  data: any;
}

interface DashboardResponse {
  quickActions: QuickAction[];
  alerts: Alert[];
  widgets: Widget[];
  timestamp: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const analysisData: EnergyAnalysis = req.body;

    // Generate Quick Actions
    const quickActions: QuickAction[] = [
      // High severity HVAC issues
      ...analysisData.hvac_inefficiencies
        .filter(issue => issue.severity === 'high')
        .map(issue => ({
          id: `qa-${issue.equipment}`,
          title: 'Urgent HVAC Repair Needed',
          description: issue.issue,
          priority: 1,
          actionType: 'repair',
          equipment: issue.equipment
        })),

      // Critical maintenance items  
      ...analysisData.maintenance_priorities
        .filter(item => item.priority === 'Critical')
        .map(item => ({
          id: `qa-maint-${item.equipment}`,
          title: 'Critical Maintenance Required',
          description: item.action,
          priority: 1,
          actionType: 'repair',
          equipment: item.equipment
        }))
    ];

    // Generate Alerts
    const alerts: Alert[] = [
      // Equipment issues
      ...analysisData.hvac_inefficiencies.map(issue => ({
        id: `alert-${issue.equipment}`,
        title: issue.severity === 'high' ? 'Critical Equipment Issue' : 'Equipment Warning',
        description: `${issue.issue}. Impact: ${issue.impact}`,
        severity: issue.severity === 'high' ? 'critical' : 'warning',
        timestamp: new Date().toISOString()
      })),

      // Maintenance alerts
      ...analysisData.maintenance_priorities.map(item => ({
        id: `alert-maint-${item.equipment}`,
        title: `${item.priority} Priority Maintenance`,
        description: item.action,
        severity: item.priority === 'Critical' ? 'critical' : 
                 item.priority === 'High' ? 'warning' : 'info',
        timestamp: new Date().toISOString()
      }))
    ];

    // Generate Widgets
    const widgets: Widget[] = [
      // HVAC Status Overview
      {
        id: 'widget-hvac-status',
        type: 'status',
        title: 'HVAC System Status',
        data: {
          totalIssues: analysisData.hvac_inefficiencies.length,
          criticalIssues: analysisData.hvac_inefficiencies.filter(i => i.severity === 'high').length,
          equipmentWithIssues: [...new Set(analysisData.hvac_inefficiencies.map(i => i.equipment))]
        }
      },

      // Maintenance Priority List
      {
        id: 'widget-maintenance',
        type: 'list',
        title: 'Maintenance Priorities',
        data: analysisData.maintenance_priorities.map(item => ({
          equipment: item.equipment,
          priority: item.priority,
          action: item.action
        }))
      },

      // Summary Metrics
      {
        id: 'widget-summary',
        type: 'metrics',
        title: 'System Overview',
        data: {
          totalMaintenance: analysisData.summary.total_maintenance_items,
          criticalIssues: analysisData.summary.critical_issues,
          highPriorityActions: analysisData.summary.high_priority_actions
        }
      }
    ];

    const response: DashboardResponse = {
      quickActions: quickActions.sort((a, b) => a.priority - b.priority),
      alerts: alerts.sort((a, b) => 
        a.severity === 'critical' ? -1 : 
        b.severity === 'critical' ? 1 : 0
      ),
      widgets,
      timestamp: new Date().toISOString()
    };

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json(response);

  } catch (error) {
    console.error('Error processing energy analysis:', error);
    return res.status(500).json({
      error: 'Failed to process energy analysis data',
      timestamp: new Date().toISOString()
    });
  }
}
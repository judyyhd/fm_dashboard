// api/energy-analysis.ts - UPDATED VERSION
export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed. Use POST.' });
  }

  try {
    const energyData = req.body[0]; // Your data comes in an array
    console.log('Processing energy analysis for dashboard:', energyData);

    // Extract quick actions from the energy analysis
    const quickActions = [];
    const alerts = [];

    // Process HVAC inefficiencies for quick actions and alerts
    if (energyData.energyAnalysis?.hvac_inefficiencies) {
      energyData.energyAnalysis.hvac_inefficiencies.forEach((issue: any) => {
        // Create alerts for each HVAC issue
        if (issue.severity === 'high') {
          alerts.push({
            id: `alert-${issue.equipment}`,
            type: 'warning',
            title: `HVAC System Warning`,
            message: `${issue.equipment}: ${issue.issue}. ${issue.impact}`,
            severity: 'high',
            timestamp: new Date().toISOString()
          });

          // Create quick action for high-severity issues
          quickActions.push({
            id: `action-${issue.equipment}`,
            title: 'Resolve Faulty Assets',
            description: `Address critical HVAC issue in ${issue.equipment}`,
            icon: '🔧',
            color: 'red',
            action: 'create_work_order',
            data: {
              equipment: issue.equipment,
              issue: issue.issue,
              priority: 'Critical'
            }
          });
        }
      });
    }

    // Process energy saving recommendations
    if (energyData.rawWeatherEnergyAnalysis?.energy_saving_recommendations) {
      energyData.rawWeatherEnergyAnalysis.energy_saving_recommendations.forEach((rec: any) => {
        alerts.push({
          id: `energy-${rec.equipment}`,
          type: 'opportunity',
          title: 'Energy Saving Opportunity',
          message: `${rec.equipment}: ${rec.action}. ${rec.estimated_energy_savings}`,
          severity: 'medium',
          timestamp: new Date().toISOString()
        });
      });

      // Add energy optimization quick action
      quickActions.push({
        id: 'optimize-energy',
        title: 'Optimize Energy Usage',
        description: `${energyData.rawWeatherEnergyAnalysis.energy_saving_recommendations.length} optimization opportunities identified`,
        icon: '⚡',
        color: 'orange',
        action: 'energy_optimization',
        data: energyData.rawWeatherEnergyAnalysis.energy_saving_recommendations
      });
    }

    // Weather-based recommendations
    if (energyData.rawWeatherEnergyAnalysis?.weather_impact_analysis) {
      const weather = energyData.rawWeatherEnergyAnalysis.weather_impact_analysis;
      
      if (weather.current_weather?.temperature_c > 30) {
        quickActions.push({
          id: 'weather-response',
          title: 'Run AI Diagnostic',
          description: `High temperature detected (${weather.current_weather.temperature_c}°C). System optimization recommended.`,
          icon: '🌡️',
          color: 'blue',
          action: 'ai_diagnostic',
          data: weather
        });
      }
    }

    // Maintenance priorities
    if (energyData.energyAnalysis?.maintenance_priorities) {
      const criticalMaintenance = energyData.energyAnalysis.maintenance_priorities.filter(
        (item: any) => item.priority === 'Critical'
      );

      if (criticalMaintenance.length > 0) {
        alerts.push({
          id: 'maintenance-critical',
          type: 'warning',
          title: 'Critical Maintenance Required',
          message: `${criticalMaintenance.length} equipment items require immediate attention`,
          severity: 'critical',
          timestamp: new Date().toISOString()
        });

        quickActions.push({
          id: 'schedule-maintenance',
          title: 'Plan Upcoming Inspections', 
          description: `Schedule ${criticalMaintenance.length} critical maintenance tasks`,
          icon: '📋',
          color: 'green',
          action: 'schedule_maintenance',
          data: criticalMaintenance
        });
      }
    }

    // Store the processed data (you'll need to implement storage)
    // For now, we'll return it so you can see the structure
    const dashboardUpdate = {
      quickActions,
      alerts,
      timestamp: new Date().toISOString(),
      summary: {
        totalIssues: alerts.length,
        criticalIssues: alerts.filter(a => a.severity === 'critical').length,
        actionItems: quickActions.length
      }
    };

    // TODO: Store this data where your React components can access it
    // Options: Vercel KV, database, or trigger a webhook to update UI

    return res.status(200).json({
      message: 'Energy analysis processed for dashboard',
      processed: true,
      dashboardUpdate,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error processing energy analysis:', error);
    return res.status(500).json({ 
      message: 'Internal server error', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}

// contexts/DashboardContext.tsx - NEW CONTEXT FOR DASHBOARD DATA
import React, { createContext, useContext, useState, useCallback } from 'react';

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  action: string;
  data?: any;
}

export interface Alert {
  id: string;
  type: 'warning' | 'opportunity' | 'success';
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
}

interface DashboardContextType {
  quickActions: QuickAction[];
  alerts: Alert[];
  updateDashboardData: (data: { quickActions: QuickAction[], alerts: Alert[] }) => void;
  dismissAlert: (alertId: string) => void;
  executeAction: (actionId: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quickActions, setQuickActions] = useState<QuickAction[]>([
    {
      id: 'default-energy',
      title: 'Optimize Energy Usage',
      description: 'Analyze consumption patterns and identify savings opportunities',
      icon: '⚡',
      color: 'orange',
      action: 'energy_analysis'
    },
    {
      id: 'default-assets',
      title: 'Resolve Faulty Assets', 
      description: 'Identify equipment with predicted maintenance needs',
      icon: '🔧',
      color: 'red',
      action: 'asset_analysis'
    },
    {
      id: 'default-inspections',
      title: 'Plan Upcoming Inspections',
      description: 'Schedule required compliance inspections and maintenance',
      icon: '📋', 
      color: 'green',
      action: 'schedule_inspections'
    },
    {
      id: 'default-diagnostic',
      title: 'Run AI Diagnostic',
      description: 'Detect anomalies across building systems and sensors',
      icon: '🔍',
      color: 'blue',
      action: 'ai_diagnostic'
    },
    {
      id: 'default-kpis',
      title: 'Review Performance KPIs',
      description: 'Get AI-generated insights on facility performance metrics',
      icon: '📊',
      color: 'purple',
      action: 'review_kpis'
    }
  ]);

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 'default-hvac',
      type: 'warning',
      title: 'HVAC System Warning',
      message: 'Building A HVAC system showing irregular temperature patterns. Maintenance inspection recommended.',
      severity: 'medium',
      timestamp: new Date().toISOString()
    },
    {
      id: 'default-energy',
      type: 'opportunity', 
      title: 'Energy Saving Opportunity',
      message: 'Lighting usage in West Wing indicates potential for 15% energy savings with scheduled dimming.',
      severity: 'low',
      timestamp: new Date().toISOString()
    },
    {
      id: 'default-maintenance',
      type: 'success',
      title: 'Preventive Maintenance Success',
      message: 'Recent elevator maintenance has reduced failure incidents by 40% compared to last quarter.',
      severity: 'low',
      timestamp: new Date().toISOString()
    }
  ]);

  const updateDashboardData = useCallback((data: { quickActions: QuickAction[], alerts: Alert[] }) => {
    // Replace AI-generated actions but keep some defaults
    const updatedActions = [
      ...data.quickActions,
      ...quickActions.filter(action => action.id.startsWith('default-'))
    ];
    
    // Add new alerts while keeping recent ones
    const updatedAlerts = [
      ...data.alerts,
      ...alerts.slice(0, 2) // Keep 2 existing alerts
    ];

    setQuickActions(updatedActions);
    setAlerts(updatedAlerts);
  }, [quickActions, alerts]);

  const dismissAlert = useCallback((alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  }, []);

  const executeAction = useCallback((actionId: string) => {
    const action = quickActions.find(a => a.id === actionId);
    if (action) {
      console.log('Executing action:', action);
      // Here you could trigger different actions based on action.action
      // e.g., create work orders, run diagnostics, etc.
    }
  }, [quickActions]);

  return (
    <DashboardContext.Provider
      value={{
        quickActions,
        alerts,
        updateDashboardData,
        dismissAlert,
        executeAction
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
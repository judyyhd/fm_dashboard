// dashboardApi.ts

export interface DashboardResponse {
  title: string;
  subtitle?: string;
  summary: {[key: string]: number | string};
  quickActions: Array<{
    id: string;
    label: string;
    action: string;
    severity?: string;
  }>;
  alerts: Array<{
    id: string;
    title: string;
    message: string;
    severity: string;
    equipment?: string;
  }>;
  widgets: Array<{
    id: string;
    type: string;
    title: string;
    data: any[];
    [key: string]: any;
  }>;
}

export const getDashboardData = (analysisData: any): DashboardResponse => {
  return {
    title: "Facility Energy & HVAC Dashboard",
    subtitle: "Critical HVAC Issues Detected",
    
    summary: {
      totalEquipment: 4,
      criticalIssues: 2,
      highPriorityActions: 2,
      maintenanceItems: analysisData.summary.total_maintenance_items,
      averageTemperature: "25.5°C"
    },

    quickActions: [
      {
        id: "repair-ff0000000000e480",
        label: "Repair Cooling Equipment",
        action: "Schedule immediate repair for equipment ff0000000000e480",
        severity: "critical"
      },
      {
        id: "adjust-ff0000000000bc21", 
        label: "Adjust Temperature Settings",
        action: "Calibrate temperature settings for equipment ff0000000000bc21",
        severity: "high"
      },
      {
        id: "inspect-cooling",
        label: "Inspect Cooling Systems",
        action: "Optimize cooling performance for equipment ff0000000000e4ac",
        severity: "medium"
      },
      {
        id: "verify-controls",
        label: "Verify Control Systems",
        action: "Check control operation for equipment ff0000000000e4a5",
        severity: "medium"
      }
    ],

    alerts: [
      {
        id: "alert-1",
        title: "Critical HVAC Failure",
        message: "Equipment ff0000000000e480 is Off while in cooling mode",
        severity: "critical",
        equipment: "ff0000000000e480"
      },
      {
        id: "alert-2", 
        title: "Temperature Setting Issue",
        message: "Equipment ff0000000000bc21 temperature set to unsafe 5°C",
        severity: "high",
        equipment: "ff0000000000bc21"
      },
      {
        id: "alert-3",
        title: "High Temperature Warning",
        message: "Room temperature 25.5°C approaching upper limit",
        severity: "warning",
        equipment: "ff0000000000e4ac"
      }
    ],

    widgets: [
      {
        id: "equipment-status",
        type: "bar",
        title: "Equipment Status Overview",
        data: [
          {name: "Critical", count: 1, color: "#ef4444"},
          {name: "High Priority", count: 1, color: "#f97316"},
          {name: "Medium Priority", count: 2, color: "#fb923c"}
        ],
        xKey: "name",
        yKey: "count",
        bars: [{key: "count", color: "#colors"}]
      },
      {
        id: "maintenance-priority",
        type: "list",
        title: "Maintenance Priority Queue",
        data: analysisData.maintenance_priorities.map((item: any) => ({
          equipment: item.equipment,
          priority: item.priority,
          action: item.action
        }))
      },
      {
        id: "temperature-metrics",
        type: "metrics",
        title: "Temperature Analysis",
        data: [
          {label: "Critical High Temp", value: "25.5°C"},
          {label: "Critical Low Temp", value: "5.0°C"},
          {label: "Equipment Affected", value: "3"}
        ]
      },
      {
        id: "temperature-trend",
        type: "line",
        title: "Temperature Trends",
        data: [
          {time: "Now", value: 25.5},
          {time: "Target", value: 22.0},
          {time: "Critical", value: 26.0}
        ],
        xKey: "time",
        lines: [{key: "value", name: "Temperature °C"}]
      }
    ]
  };
};

export default getDashboardData;
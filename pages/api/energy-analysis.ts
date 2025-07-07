import type { NextApiRequest, NextApiResponse } from 'next';

export interface DashboardResponse {
  title: string;
  subtitle: string;
  summary: {
    totalEquipment: number;
    criticalIssues: number;
    energyRecommendations: number;
    maintenanceItems: number;
    outdoorTemp: string;
    lastUpdated: string;
  };
  quickActions: Array<{
    id: string;
    label: string;
    priority: 'high' | 'medium' | 'low';
    equipment: string;
    action: string;
  }>;
  alerts: Array<{
    id: string;
    type: 'error' | 'warning' | 'info';
    message: string;
    equipment: string;
    severity: string;
  }>;
  widgets: Array<{
    id: string;
    type: string;
    title: string;
    data: any;
  }>;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<DashboardResponse>
) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  const response: DashboardResponse = {
    title: "Facility Energy Analysis Dashboard",
    subtitle: "3 HVAC Issues Detected • System Performance Alert",
    summary: {
      totalEquipment: 4,
      criticalIssues: 1,
      energyRecommendations: 0,
      maintenanceItems: 4,
      outdoorTemp: "25.5°C",
      lastUpdated: new Date().toISOString()
    },
    quickActions: [
      {
        id: "qa1",
        label: "Critical Repair Required",
        priority: "high",
        equipment: "ff0000000000e480",
        action: "Immediate repair and system check"
      },
      {
        id: "qa2", 
        label: "Adjust Temperature Setting",
        priority: "high",
        equipment: "ff0000000000bc21",
        action: "Temperature setting adjustment and system calibration"
      },
      {
        id: "qa3",
        label: "Optimize Cooling System",
        priority: "medium",
        equipment: "ff0000000000e4ac",
        action: "Inspect and optimize cooling system performance"
      }
    ],
    alerts: [
      {
        id: "alert1",
        type: "error",
        message: "Equipment status is Off while in cooling mode",
        equipment: "ff0000000000e480",
        severity: "high"
      },
      {
        id: "alert2",
        type: "error",
        message: "Temperature setting of 5°C is below normal operating range",
        equipment: "ff0000000000bc21", 
        severity: "high"
      },
      {
        id: "alert3",
        type: "warning",
        message: "Room temperature of 25.5°C approaching upper limit",
        equipment: "ff0000000000e4ac",
        severity: "medium"
      }
    ],
    widgets: [
      {
        id: "widget1",
        type: "maintenance",
        title: "Maintenance Priorities",
        data: {
          items: [
            {
              equipment: "ff0000000000e480",
              priority: "Critical",
              action: "Immediate repair and system check"
            },
            {
              equipment: "ff0000000000bc21",
              priority: "High", 
              action: "Temperature setting adjustment and system calibration"
            },
            {
              equipment: "ff0000000000e4ac",
              priority: "Medium",
              action: "Inspect and optimize cooling system performance"
            },
            {
              equipment: "ff0000000000e4a5",
              priority: "Medium",
              action: "Unlock controls and verify proper operation"
            }
          ]
        }
      },
      {
        id: "widget2",
        type: "issues",
        title: "HVAC Inefficiencies",
        data: {
          items: [
            {
              equipment: "ff0000000000e480",
              issue: "Equipment status is Off while in cooling mode",
              severity: "high",
              impact: "Potential energy waste and inability to manage cooling load effectively"
            },
            {
              equipment: "ff0000000000bc21",
              issue: "Temperature setting of 5°C is below normal operating range", 
              severity: "high",
              impact: "Excessive cooling leading to high energy consumption and potential equipment strain"
            },
            {
              equipment: "ff0000000000e4ac",
              issue: "Room temperature of 25.5°C approaching upper limit",
              severity: "medium", 
              impact: "Insufficient cooling capacity or system inefficiency"
            }
          ]
        }
      }
    ]
  };

  res.status(200).json(response);
}
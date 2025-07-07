export const config = { api: { bodyParser: true } };

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const dashboardData = {
    title: "Facility Energy Analysis Dashboard",
    subtitle: "3 HVAC Issues Detected • 31.2°C Outdoor Temperature",
    summary: {
      totalEquipment: 4,
      criticalIssues: 1,
      energyRecommendations: 3,
      maintenanceItems: 4
    },
    quickActions: [
      {
        id: "repair-ff0000000000e480",
        title: "Repair Cooling System",
        description: "Equipment ff0000000000e480 requires immediate repair due to offline status during cooling mode",
        priority: "high",
        icon: "alert-circle",
        color: "red"
      },
      {
        id: "adjust-ff0000000000bc21",
        title: "Adjust Temperature Setting",
        description: "Increase temperature setting from 5°C to recommended 22°C on equipment ff0000000000bc21",
        priority: "high",
        icon: "thermometer",
        color: "amber"
      },
      {
        id: "optimize-ff0000000000e4ac",
        title: "Optimize Cooling Performance",
        description: "Check system efficiency for equipment ff0000000000e4ac due to elevated temperature",
        priority: "medium",
        icon: "settings",
        color: "blue"
      }
    ],
    alerts: [
      {
        id: "alert-offline-cooling",
        title: "Cooling System Offline",
        description: "Equipment status is Off while in cooling mode",
        equipment: "ff0000000000e480",
        severity: "high",
        icon: "power-off",
        color: "red"
      },
      {
        id: "alert-low-temp",
        title: "Abnormal Temperature Setting",
        description: "Temperature setting of 5°C is below normal operating range",
        equipment: "ff0000000000bc21",
        severity: "high",
        icon: "thermometer-snow",
        color: "amber"
      },
      {
        id: "alert-high-temp",
        title: "High Room Temperature",
        description: "Room temperature of 25.5°C approaching upper limit",
        equipment: "ff0000000000e4ac",
        severity: "medium",
        icon: "thermometer-sun",
        color: "yellow"
      }
    ],
    widgets: [
      {
        id: "outdoor-temperature",
        title: "Outdoor Temperature",
        value: 31.2,
        unit: "°C",
        icon: "sun",
        color: "orange"
      },
      {
        id: "temperature-differential",
        title: "Max Temperature Differential",
        value: 26.2,
        unit: "°C",
        icon: "git-fork",
        color: "blue"
      },
      {
        id: "critical-maintenance",
        title: "Critical Maintenance Items",
        value: 1,
        icon: "tool",
        color: "red"
      },
      {
        id: "energy-recommendations",
        title: "Energy Recommendations",
        value: 3,
        icon: "lightbulb",
        color: "green"
      }
    ]
  };

  return res.status(200).json(dashboardData);
}
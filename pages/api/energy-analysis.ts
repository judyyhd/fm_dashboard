export const config = { api: { bodyParser: true } };

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const dashboard = {
    title: "Facility Energy Analysis Dashboard",
    subtitle: "3 HVAC Issues Detected • 31.2°C Outdoor Temperature",
    summary: {
      totalEquipment: 4,
      criticalIssues: 1,
      energyRecommendations: 3,
      maintenanceItems: 4,
      outdoorTemp: "31.2",
      lastUpdated: new Date().toISOString()
    },
    quickActions: [
      {
        id: "repair-ff0000000000e480",
        title: "Repair Offline Equipment",
        description: "Equipment status is Off while in cooling mode",
        priority: "high",
        icon: "alert-triangle",
        color: "red"
      },
      {
        id: "adjust-ff0000000000bc21",
        title: "Adjust Temperature Setting",
        description: "Increase from 5°C to recommended 22°C",
        priority: "high",
        icon: "thermometer",
        color: "amber"
      },
      {
        id: "optimize-ff0000000000e4ac",
        title: "Optimize Cooling System",
        description: "Address elevated room temperature of 25.5°C",
        priority: "medium",
        icon: "settings",
        color: "blue"
      }
    ],
    alerts: [
      {
        id: "alert-offline-cooling",
        title: "Equipment Offline in Cooling Mode",
        description: "Potential energy waste and inability to manage cooling load effectively",
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
        icon: "thermometer-snowflake",
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
        id: "outdoor-temp",
        title: "Outdoor Temperature",
        value: 31.2,
        unit: "°C",
        icon: "sun",
        color: "orange"
      },
      {
        id: "feels-like",
        title: "Feels Like",
        value: 35.1,
        unit: "°C",
        icon: "thermometer",
        color: "red"
      },
      {
        id: "heat-index",
        title: "Heat Index",
        value: 36.6,
        unit: "°C",
        icon: "flame",
        color: "red"
      },
      {
        id: "uv-index",
        title: "UV Index",
        value: 9.5,
        icon: "sun",
        color: "purple"
      }
    ]
  };

  return res.status(200).json(dashboard);
}
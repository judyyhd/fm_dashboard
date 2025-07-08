export const config = { api: { bodyParser: true } };

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const dashboard = {
    title: "Facility Energy Analysis Dashboard",
    subtitle: "3 HVAC Issues Detected • 31.2°C Outdoor Temperature",
    summary: {
      totalEquipment: 3,
      criticalIssues: 2,
      energyRecommendations: 3,
      maintenanceItems: 3
    },
    quickActions: [
      {
        id: "increase-temp-setpoint",
        title: "Increase Temperature Setpoints",
        description: "Raise setpoints to 22°C for units ff0000000000bc21 and ff0000000000e489",
        priority: "high",
        icon: "thermometer",
        color: "red"
      },
      {
        id: "repair-keylock",
        title: "Repair Keylock Mechanism",
        description: "Fix keylock issues on unit ff0000000000e4a5",
        priority: "medium",
        icon: "key",
        color: "amber"
      },
      {
        id: "standardize-fan-speed",
        title: "Standardize Fan Speeds",
        description: "Optimize fan speed settings across all units",
        priority: "low",
        icon: "fan",
        color: "blue"
      }
    ],
    alerts: [
      {
        id: "critical-low-temp",
        title: "Critical Low Temperature Setting",
        description: "Units operating at 5°C and 6°C setpoints",
        equipment: "ff0000000000bc21, ff0000000000e489",
        severity: "high",
        icon: "alert-triangle",
        color: "red"
      },
      {
        id: "keylock-malfunction",
        title: "Equipment Malfunction",
        description: "Keylock mechanism issue detected",
        equipment: "ff0000000000e4a5",
        severity: "medium",
        icon: "alert-circle",
        color: "amber"
      },
      {
        id: "fan-speed-variance",
        title: "Inconsistent Fan Speed Settings",
        description: "High variance in fan speeds detected across units",
        equipment: "All HVAC units",
        severity: "low",
        icon: "alert-octagon",
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
        id: "heat-index",
        title: "Heat Index",
        value: 36.6,
        unit: "°C",
        icon: "thermometer-sun",
        color: "red"
      },
      {
        id: "energy-savings",
        title: "Potential Energy Savings",
        value: "15-20",
        unit: "%",
        icon: "trending-down",
        color: "green"
      },
      {
        id: "uv-index",
        title: "UV Index",
        value: 9.5,
        icon: "sun-medium",
        color: "purple"
      }
    ]
  };

  return res.status(200).json(dashboard);
}
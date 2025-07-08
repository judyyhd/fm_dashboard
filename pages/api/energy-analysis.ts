export const config = {
  api: { bodyParser: true }
}

import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const dashboard = {
    title: "Facility Energy Analysis Dashboard",
    subtitle: "2 Equipment Issues Detected • 32.4°C Outdoor Temperature",
    summary: {
      totalEquipment: 2,
      criticalIssues: 1,
      energyRecommendations: 3,
      maintenanceItems: 2
    },
    quickActions: [
      {
        id: "adjust-setpoint",
        title: "Adjust Setpoint",
        description: "Increase setpoint to 23-24°C for optimal efficiency",
        priority: "high",
        icon: "thermometer",
        color: "red"
      },
      {
        id: "remove-lock",
        title: "Remove Equipment Lock",
        description: "Remove unauthorized lock on unit ff0000000000e4a5",
        priority: "medium",
        icon: "lock",
        color: "amber"
      },
      {
        id: "calibrate-sensors",
        title: "Calibrate Sensors",
        description: "Calibrate temperature sensors across all units",
        priority: "low",
        icon: "tool",
        color: "blue"
      }
    ],
    alerts: [
      {
        id: "critical-temp-differential",
        title: "Critical Temperature Differential",
        description: "27.4°C temperature differential exceeding efficient operating range",
        equipment: "ff0000000000bc21",
        severity: "high",
        icon: "alert-triangle",
        color: "red"
      },
      {
        id: "locked-equipment",
        title: "Equipment Lock Detected",
        description: "Locked status preventing automated weather-responsive operation",
        equipment: "ff0000000000e4a5",
        severity: "medium",
        icon: "lock",
        color: "amber"
      }
    ],
    widgets: [
      {
        id: "outdoor-temp",
        title: "Outdoor Temperature",
        value: 32.4,
        unit: "°C",
        icon: "sun",
        color: "orange"
      },
      {
        id: "heat-index",
        title: "Heat Index",
        value: 37.5,
        unit: "°C",
        icon: "thermometer",
        color: "red"
      },
      {
        id: "potential-savings",
        title: "Potential Energy Savings",
        value: "35",
        unit: "%",
        icon: "trending-down",
        color: "green"
      },
      {
        id: "uv-index",
        title: "UV Index",
        value: 7.5,
        icon: "sun",
        color: "yellow"
      }
    ]
  }

  return res.status(200).json(dashboard)
}
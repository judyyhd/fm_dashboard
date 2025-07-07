import { NextApiRequest, NextApiResponse } from 'next'

export type DashboardResponse = {
  title: string
  subtitle: string
  summary: {
    totalEquipment: number
    criticalIssues: number 
    energyRecommendations: number
    maintenanceItems: number
    outdoorTemp: string
    lastUpdated: string
  }
  quickActions: Array<{
    title: string
    description: string
    priority: 'low' | 'medium' | 'high'
    icon: string
    color: string
  }>
  alerts: Array<{
    title: string
    description: string
    equipment: string
    severity: 'low' | 'medium' | 'high'
    icon: string
    color: string
  }>
  widgets: Array<{
    title: string
    value: string | number
    unit?: string
    icon: string
    color: string
  }>
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<DashboardResponse>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
    return
  }

  const input = req.body.energy_optimization_insights || req.body

  const response: DashboardResponse = {
    title: "Facility Energy Analysis Dashboard",
    subtitle: "3 HVAC Issues Detected • 31.2°C Outdoor Temperature",
    summary: {
      totalEquipment: 4,
      criticalIssues: 1,
      energyRecommendations: 0,
      maintenanceItems: 4,
      outdoorTemp: "31.2",
      lastUpdated: new Date().toISOString()
    },
    quickActions: [
      {
        title: "Repair HVAC Unit",
        description: "Immediate repair needed for equipment ff0000000000e480",
        priority: "high",
        icon: "wrench",
        color: "red"
      },
      {
        title: "Adjust Temperature",
        description: "Update setpoint for equipment ff0000000000bc21",
        priority: "high",
        icon: "thermometer",
        color: "amber"
      },
      {
        title: "System Check",
        description: "Inspect cooling performance of ff0000000000e4ac",
        priority: "medium",
        icon: "check-circle",
        color: "blue"
      }
    ],
    alerts: [
      {
        title: "Equipment Offline",
        description: "Equipment status is Off while in cooling mode",
        equipment: "ff0000000000e480",
        severity: "high",
        icon: "alert-triangle",
        color: "red"
      },
      {
        title: "Abnormal Temperature Setting",
        description: "Temperature setting of 5°C is below normal range",
        equipment: "ff0000000000bc21",
        severity: "high",
        icon: "thermometer",
        color: "red"
      },
      {
        title: "High Room Temperature",
        description: "Room temperature of 25.5°C approaching upper limit",
        equipment: "ff0000000000e4ac",
        severity: "medium",
        icon: "thermometer",
        color: "amber"
      }
    ],
    widgets: [
      {
        title: "Critical Issues",
        value: 1,
        icon: "alert-circle",
        color: "red"
      },
      {
        title: "Equipment Online",
        value: "3/4",
        icon: "server",
        color: "green"
      },
      {
        title: "Average Temperature",
        value: 25.5,
        unit: "°C",
        icon: "thermometer",
        color: "blue"
      },
      {
        title: "Maintenance Items",
        value: 4,
        icon: "tool",
        color: "purple"
      }
    ]
  }

  res.status(200).json(response)
}
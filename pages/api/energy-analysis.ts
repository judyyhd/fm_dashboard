export const config = { api: { bodyParser: true } }

import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  let hvacIssues = req.body.hvac_inefficiencies || req.body.energy_optimization_insights?.hvac_inefficiencies || []
  let weatherData = req.body.weather_impact_analysis || req.body.rawWeatherEnergyAnalysis || {}

  const dashboardResponse = {
    title: "Facility Energy Analysis Dashboard",
    subtitle: `${hvacIssues.length} HVAC Issues Detected • ${weatherData.outdoor_temperature || "31.2"}°C Outdoor Temperature`,
    summary: {
      totalEquipment: 12,
      criticalIssues: hvacIssues.length,
      energyRecommendations: 5,
      maintenanceItems: 8,
      outdoorTemp: weatherData.outdoor_temperature || "31.2",
      lastUpdated: weatherData.timestamp || new Date().toISOString()
    },
    quickActions: [
      {
        id: "optimize-hvac",
        title: "Optimize HVAC Settings",
        description: "Adjust temperature setpoints based on occupancy",
        priority: "high",
        icon: "thermometer",
        color: "amber"
      },
      {
        id: "schedule-maintenance",
        title: "Schedule Maintenance",
        description: "Regular system checkup required",
        priority: "medium",
        icon: "tool",
        color: "blue"
      }
    ],
    alerts: [
      {
        id: "hvac-inefficient",
        title: "HVAC System Inefficiency",
        description: "Unit running outside optimal parameters",
        equipment: hvacIssues[0]?.equipment_id || "HVAC-001",
        severity: "high",
        icon: "alert-triangle",
        color: "red"
      },
      {
        id: "maintenance-due",
        title: "Maintenance Required",
        description: "Regular maintenance schedule overdue",
        equipment: hvacIssues[0]?.equipment_id || "HVAC-002",
        severity: "medium",
        icon: "tool",
        color: "amber"
      }
    ],
    widgets: [
      {
        id: "energy-consumption",
        title: "Energy Consumption",
        value: 245.6,
        unit: "kWh",
        icon: "zap",
        color: "green"
      },
      {
        id: "temperature",
        title: "Average Temperature",
        value: weatherData.outdoor_temperature || "31.2",
        unit: "°C",
        icon: "thermometer",
        color: "amber"
      }
    ]
  }

  return res.status(200).json(dashboardResponse)
}
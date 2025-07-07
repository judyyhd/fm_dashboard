import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

const inputSchema = z.object({
  hvac_inefficiencies: z.array(z.object({
    equipment: z.string(),
    issue: z.string(),
    severity: z.string(),
    impact: z.string()
  })).optional(),
  maintenance_priorities: z.array(z.object({
    equipment: z.string(),
    priority: z.string(),
    action: z.string()
  })).optional(),
  energy_optimization_insights: z.object({
    hvac_inefficiencies: z.array(z.object({
      equipment: z.string(),
      issue: z.string(), 
      severity: z.string(),
      impact: z.string()
    })),
    maintenance_priorities: z.array(z.object({
      equipment: z.string(),
      priority: z.string(),
      action: z.string()
    }))
  }).optional()
}).strict()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const input = inputSchema.parse(req.body)
    
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
          id: "repair-hvac-e480",
          title: "Repair HVAC E480",
          description: "Equipment status is Off while in cooling mode",
          priority: "high" as const,
          icon: "wrench",
          color: "red"
        },
        {
          id: "adjust-temp-bc21", 
          title: "Adjust Temperature BC21",
          description: "Adjust temperature setting from 5°C",
          priority: "high" as const,
          icon: "thermometer",
          color: "amber"
        }
      ],
      alerts: [
        {
          id: "critical-e480",
          title: "Critical HVAC Issue",
          description: "Equipment E480 offline during cooling mode",
          equipment: "ff0000000000e480",
          severity: "high" as const,
          icon: "alert-triangle",
          color: "red"
        },
        {
          id: "temp-warning-e4ac",
          title: "High Temperature Warning",
          description: "Room temperature 25.5°C approaching limit",
          equipment: "ff0000000000e4ac", 
          severity: "medium" as const,
          icon: "thermometer",
          color: "amber"
        }
      ],
      widgets: [
        {
          id: "total-equipment",
          title: "Total Equipment",
          value: 4,
          icon: "server",
          color: "blue"
        },
        {
          id: "critical-issues",
          title: "Critical Issues",
          value: 1,
          icon: "alert-circle",
          color: "red"
        },
        {
          id: "outdoor-temp",
          title: "Outdoor Temperature",
          value: 31.2,
          unit: "°C",
          icon: "thermometer",
          color: "amber"
        }
      ]
    }

    return res.status(200).json(dashboard)
  } catch (error) {
    return res.status(400).json({ message: 'Invalid request data' })
  }
}
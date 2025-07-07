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
    id: string
    title: string
    description: string
    priority: 'low' | 'medium' | 'high'
    icon: string
    color: string
  }>
  alerts: Array<{
    id: string
    title: string
    description: string
    equipment: string
    severity: 'low' | 'medium' | 'high'
    icon: string
    color: string
  }>
  widgets: Array<{
    id: string
    title: string
    value: string | number
    unit?: string
    icon: string
    color: string
  }>
}
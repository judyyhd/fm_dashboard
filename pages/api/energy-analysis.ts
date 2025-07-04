import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Return simple test data
  return res.status(200).json({
    title: "Facility Energy Dashboard",
    subtitle: "Critical HVAC Issues Detected",
    summary: {
      totalEquipment: 4,
      criticalIssues: 2,
      maintenanceItems: 3
    },
    quickActions: [
      {
        id: "test-action",
        title: "Test Action",
        description: "This is a test action",
        severity: "critical"
      }
    ],
    alerts: [
      {
        id: "test-alert",
        title: "Test Alert",
        message: "This is a test alert",
        type: "warning",
        timestamp: new Date().toISOString()
      }
    ],
    widgets: [
      {
        id: "test-widget",
        type: "metrics",
        title: "Test Metrics",
        data: {
          "Test Metric": "Working!"
        }
      }
    ]
  });
}

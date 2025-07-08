import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: { bodyParser: true }
};

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const dashboard = {
  "summary": {
    "status": {
      "level": "critical",
      "icon": "alert-triangle",
      "color": "red",
      "message": "CRITICAL - Immediate Action Required",
      "timestamp": "2025-07-08T02:54:49.204Z",
      "confidence": "HIGH"
    },
    "metrics": {
      "total_issues": 6,
      "critical_issues": 3,
      "potential_savings": {
        "value": 30,
        "unit": "%",
        "description": "25-30% of current HVAC energy costs"
      }
    },
    "key_message": "Multiple critical HVAC units are operating with severe configuration errors causing significant energy waste and comfort issues. Immediate corrective action can yield 25% energy savings with minimal investment."
  },
  "priority_alerts": [
    {
      "id": "CRITICAL-001",
      "severity": "critical",
      "icon": "thermometer",
      "equipment": [
        "ff0000000000bc21",
        "ff0000000000e489"
      ],
      "title": "Extreme setpoint misconfiguration",
      "description": "Extreme setpoint misconfiguration (5-6°C) causing severe energy waste",
      "action": "Immediately adjust setpoints to 23°C",
      "timeline": "IMMEDIATE",
      "impact": {
        "business": "CRITICAL",
        "savings": "30% immediate energy savings",
        "risk": "Continued excessive energy consumption and potential equipment damage"
      },
      "resources": {
        "type": "INTERNAL",
        "cost": "$0 (configuration only)"
      }
    },
    {
      "id": "CRITICAL-002",
      "severity": "critical",
      "icon": "thermometer",
      "equipment": [
        "AHU-03"
      ],
      "title": "Critical temperature control failure",
      "description": "Critical temperature control failure with 3.7°C deviation above setpoint",
      "action": "Inspect temperature sensors and cooling capacity",
      "timeline": "2_HOURS",
      "impact": {
        "business": "CRITICAL",
        "benefit": "Restored comfort conditions and prevented equipment failure",
        "risk": "Occupant discomfort and potential system failure"
      },
      "resources": {
        "type": "INTERNAL",
        "cost": "Internal labor (2 hours)"
      }
    }
  ],
  "action_plan": {
    "immediate": {
      "actions": [
        {
          "priority": 1,
          "description": "Reset setpoints on critically misconfigured units",
          "equipment": [
            "ff0000000000bc21",
            "ff0000000000e489"
          ],
          "assigned_to": "FACILITY_TEAM",
          "timeline": "Next 1 hour",
          "success_criteria": "Setpoints adjusted to 23°C and stable operation confirmed"
        }
      ]
    },
    "today": {
      "actions": [
        {
          "priority": 2,
          "description": "Investigate AHU-03 temperature control issues",
          "equipment": [
            "AHU-03"
          ],
          "assigned_to": "FACILITY_TEAM",
          "timeline": "Complete within 2 hours",
          "success_criteria": "Temperature deviation reduced to <1°C"
        }
      ]
    },
    "this_week": {
      "actions": [
        {
          "priority": 3,
          "description": "Implement facility-wide setpoint standardization",
          "equipment": [
            "ALL"
          ],
          "assigned_to": "FACILITY_TEAM",
          "timeline": "Complete within 5 days",
          "success_criteria": "All setpoints standardized to 23°C ±1°C"
        }
      ]
    }
  },
  "insights": {
    "patterns": [
      {
        "pattern": "Temperature Control System Failures",
        "affected_equipment": [
          "ff0000000000bc21",
          "ff0000000000e489",
          "ff0000000000e480",
          "AHU-03"
        ],
        "identified_by": [
          "Temperature Analysis",
          "Energy Efficiency"
        ],
        "confidence": "HIGH",
        "root_cause": "Combination of configuration errors and control system issues",
        "solution": "Implement facility-wide setpoint standardization and control system audit"
      }
    ],
    "trends": [
      {
        "trend": "Widespread temperature control issues",
        "impact": "Affecting both energy efficiency and occupant comfort",
        "recommendation": "Conduct comprehensive control system review and standardization"
      }
    ]
  },
  "business_impact": {
    "energy_savings": {
      "immediate": "15% through setpoint correction",
      "short_term": "25% through control optimization",
      "long_term": "30% with full system optimization"
    },
    "comfort": {
      "severity": "HIGH"
    },
    "risks": [
      {
        "risk": "Equipment damage from extreme setpoints",
        "probability": "HIGH",
        "consequence": "Premature system failure and replacement costs",
        "mitigation": "Immediate setpoint correction"
      }
    ],
    "cost_benefit": "Immediate actions require minimal investment with potential 25-30% energy cost reduction"
  },
  "resources": {
    "internal_hours": 8,
    "contractor_needed": false,
    "specialist_needed": false,
    "estimated_cost": "$0-500 (primarily internal labor)",
    "budget_approval": false,
    "procurement": []
  },
  "next_steps": {
    "immediate": "Dispatch facility team to correct critical setpoint configurations",
    "decisions": [
      {
        "topic": "Control system audit scope",
        "options": [
          "Internal review",
          "External audit",
          "Phased approach"
        ],
        "recommendation": "Begin with internal review and escalate if needed",
        "deadline": "Decision required within 48 hours"
      }
    ],
    "follow_up": [
      {
        "action": "Verify setpoint corrections",
        "timeline": "Within 2 hours of implementation",
        "responsible": "Facility Manager"
      }
    ]
  }
};
  
  return res.status(200).json(dashboard);
}
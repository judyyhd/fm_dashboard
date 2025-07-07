import React, { createContext, useContext, useState, useEffect } from 'react';

useEffect(() => {
  fetch('/api/energy-analysis', {
    method: 'POST', 
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(energyData)
  })
  .then(res => res.json())
  .then(data => {
    // Update your dashboard with data.quickActions, data.alerts, etc.
    setQuickActions(data.quickActions);
    setAlerts(data.alerts);
  });
}, []);

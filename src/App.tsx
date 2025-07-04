// App.tsx - Update this file
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import WorkOrders from './pages/WorkOrders';
import AssetManagement from './pages/AssetManagement';
import Settings from './pages/Settings';
import RealTimeData from './pages/RealTimeData';
import { WorkOrderProvider } from './contexts/WorkOrderContext';
import { DashboardProvider } from './contexts/DashboardContext'; // NEW

export function App() {
  return (
    <DashboardProvider> {/* NEW */}
      <WorkOrderProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/work-orders" element={<WorkOrders />} />
              <Route path="/asset-management" element={<AssetManagement />} />
              <Route path="/realtime-data" element={<RealTimeData />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Layout>
        </Router>
      </WorkOrderProvider>
    </DashboardProvider>
  );
}
import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { DashboardResponse } from '@/pages/api/energy-analysis';

interface DashboardContextType {
  dashboardData: DashboardResponse | null;
  loading: boolean;
  error: string | null;
}

const DashboardContext = createContext<DashboardContextType>({
  dashboardData: null,
  loading: true,
  error: null,
});

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [dashboardData, setDashboardData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/energy-analysis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}), // Empty request body — not used by the API
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch data: ${res.status}`);
        }

        const data: DashboardResponse = await res.json();
        setDashboardData(data);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <DashboardContext.Provider value={{ dashboardData, loading, error }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);

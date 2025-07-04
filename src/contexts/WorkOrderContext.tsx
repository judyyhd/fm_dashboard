// src/contexts/WorkOrderContext.tsx - CREATE THIS NEW FILE
import React, { createContext, useContext, useState, useCallback } from 'react';

export interface WorkOrder {
  id: string;
  issue: string;
  location: string;
  requestedBy: string;
  assignedTo: string;
  dueDate: string;
  status: 'Open' | 'In Progress' | 'Completed' | 'Scheduled' | 'On Hold';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  statusColor: string;
  priorityColor: string;
  createdDate: string;
  description?: string;
}

interface WorkOrderContextType {
  workOrders: WorkOrder[];
  addWorkOrder: (workOrder: Omit<WorkOrder, 'id' | 'createdDate' | 'statusColor' | 'priorityColor'>) => void;
  updateWorkOrder: (id: string, updates: Partial<WorkOrder>) => void;
  deleteWorkOrder: (id: string) => void;
  getWorkOrderStats: () => {
    total: number;
    inProgress: number;
    highPriority: number;
    unassigned: number;
  };
}

const WorkOrderContext = createContext<WorkOrderContextType | undefined>(undefined);

export const useWorkOrders = () => {
  const context = useContext(WorkOrderContext);
  if (!context) {
    throw new Error('useWorkOrders must be used within a WorkOrderProvider');
  }
  return context;
};

export const WorkOrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);

  // Helper function to get status and priority colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-gray-100 text-gray-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Scheduled': return 'bg-purple-100 text-purple-800';
      case 'On Hold': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-blue-100 text-blue-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const generateId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `WO-${timestamp}-${random}`;
  };

  const addWorkOrder = useCallback((newWorkOrder: Omit<WorkOrder, 'id' | 'createdDate' | 'statusColor' | 'priorityColor'>) => {
    const workOrder: WorkOrder = {
      ...newWorkOrder,
      id: generateId(),
      createdDate: new Date().toISOString(),
      statusColor: getStatusColor(newWorkOrder.status),
      priorityColor: getPriorityColor(newWorkOrder.priority)
    };

    setWorkOrders(prev => [workOrder, ...prev]);

    // Optional: Send to n8n workflow for processing
    // sendToN8N('work-order-created', workOrder);
  }, []);

  const updateWorkOrder = useCallback((id: string, updates: Partial<WorkOrder>) => {
    setWorkOrders(prev => prev.map(wo => {
      if (wo.id === id) {
        const updated = { ...wo, ...updates };
        // Update colors if status or priority changed
        if (updates.status) updated.statusColor = getStatusColor(updates.status);
        if (updates.priority) updated.priorityColor = getPriorityColor(updates.priority);
        return updated;
      }
      return wo;
    }));
  }, []);

  const deleteWorkOrder = useCallback((id: string) => {
    setWorkOrders(prev => prev.filter(wo => wo.id !== id));
  }, []);

  const getWorkOrderStats = useCallback(() => {
    return {
      total: workOrders.length,
      inProgress: workOrders.filter(wo => wo.status === 'In Progress').length,
      highPriority: workOrders.filter(wo => wo.priority === 'High' || wo.priority === 'Critical').length,
      unassigned: workOrders.filter(wo => wo.assignedTo === 'Unassigned').length
    };
  }, [workOrders]);

  return (
    <WorkOrderContext.Provider
      value={{
        workOrders,
        addWorkOrder,
        updateWorkOrder,
        deleteWorkOrder,
        getWorkOrderStats
      }}
    >
      {children}
    </WorkOrderContext.Provider>
  );
};
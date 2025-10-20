
"use client";

import React, { createContext, useState, useCallback, ReactNode } from 'react';
import { alerts as initialAlertsData } from '@/lib/data';
import type { Alert } from '@/lib/types';

// Define the shape of the context
interface AlertContextType {
    alerts: Alert[];
    setAlerts: React.Dispatch<React.SetStateAction<Alert[]>>;
    refreshAlerts: () => void;
}

// Create the context with a default value
export const AlertContext = createContext<AlertContextType>({
    alerts: [],
    setAlerts: () => {},
    refreshAlerts: () => {},
});

// Create the provider component
export const AlertProvider = ({ children }: { children: ReactNode }) => {
    const [alerts, setAlerts] = useState<Alert[]>(initialAlertsData);

    const refreshAlerts = useCallback(() => {
        // In a real app, you'd fetch this from an API.
        // For now, we reset to the initial static data.
        setAlerts(initialAlertsData);
    }, []);

    return (
        <AlertContext.Provider value={{ alerts, setAlerts, refreshAlerts }}>
            {children}
        </AlertContext.Provider>
    );
};

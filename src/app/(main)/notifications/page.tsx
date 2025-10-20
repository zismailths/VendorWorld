
"use client";

import { useState, useCallback } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { alerts as initialAlerts } from "@/lib/data";
import { formatDistanceToNow } from "date-fns";
import { AlertTriangle, Trophy, RefreshCw, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Alert } from "@/lib/types";

const alertIcons: Record<Alert['type'], JSX.Element> = {
  RANK_1: <Trophy className="h-5 w-5 text-green-600" />,
  UNDERCUT: <AlertTriangle className="h-5 w-5 text-red-600" />,
  NEW_OFFER: <PlusCircle className="h-5 w-5 text-amber-600" />,
};

const alertBgColors: Record<Alert['type'], string> = {
    RANK_1: "bg-green-100/70 border-green-200 hover:bg-green-100",
    UNDERCUT: "bg-red-100/70 border-red-200 hover:bg-red-100",
    NEW_OFFER: "bg-amber-100/70 border-amber-200 hover:bg-amber-100",
}

export default function AlertsPage() {
  const [currentAlerts, setCurrentAlerts] = useState<Alert[]>(initialAlerts);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = useCallback(() => {
    setIsLoading(true);
    setCurrentAlerts([]); // Clear alerts to give visual feedback

    setTimeout(() => {
        // In a real app, you'd re-fetch data here.
        // For now, we reset to the initial static data and update the key.
        setCurrentAlerts(initialAlerts); 
        setRefreshKey(prev => prev + 1);
        setIsLoading(false);
    }, 500); // Simulate a network delay
  }, []);

  return (
    <>
      <PageHeader
        title="Alerts"
        description="Review all your recent account and offer alerts."
      >
        <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
          <RefreshCw className={cn("mr-2 h-4 w-4", isLoading && "animate-spin")} />
          Refresh
        </Button>
      </PageHeader>
      <main className="p-6 pt-0" key={refreshKey}>
        <Card>
            <CardHeader>
                <CardTitle>Recent Alerts</CardTitle>
                <CardDescription>Here are the latest notifications.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                {currentAlerts.map((alert) => (
                    <div key={alert.id} className={cn("flex items-start gap-4 p-4 border rounded-lg transition-colors", alertBgColors[alert.type])}>
                    <div className="mt-1">{alertIcons[alert.type]}</div>
                    <div className="flex-1">
                        <p className="text-sm font-medium">{alert.message}</p>
                        <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(alert.createdAt), { addSuffix: true })}
                        </p>
                    </div>
                    </div>
                ))}
                {(currentAlerts.length === 0 || isLoading) && (
                    <div className="text-center text-muted-foreground py-8">
                        {isLoading ? "Refreshing alerts..." : "No new alerts."}
                    </div>
                )}
                </div>
            </CardContent>
        </Card>
      </main>
    </>
  );
}

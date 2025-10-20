
"use client";

import { useState, useCallback, useContext } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { AlertTriangle, Trophy, RefreshCw, PlusCircle, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Alert } from "@/lib/types";
import { AlertContext } from "@/context/alert-context";

const alertIcons: Record<Alert['type'], JSX.Element> = {
  RANK_1: <Trophy className="h-5 w-5 text-green-600" />,
  UNDERCUT: <AlertTriangle className="h-5 w-5 text-red-600" />,
  NEW_OFFER: <PlusCircle className="h-5 w-5 text-amber-600" />,
};

const alertBgColors: Record<Alert['type'], string> = {
    RANK_1: "bg-green-100/60 border-green-200/60 hover:bg-green-100",
    UNDERCUT: "bg-red-100/60 border-red-200/60 hover:bg-red-100",
    NEW_OFFER: "bg-amber-100/60 border-amber-200/60 hover:bg-amber-100",
}

export default function AlertsPage() {
  const { alerts, setAlerts, refreshAlerts } = useContext(AlertContext);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = useCallback(() => {
    setIsLoading(true);
    // Visually clear alerts and then bring them back to simulate refresh
    setAlerts([]);
    setTimeout(() => {
        refreshAlerts();
        setRefreshKey(prev => prev + 1);
        setIsLoading(false);
    }, 500); // Simulate a network delay
  }, [refreshAlerts, setAlerts]);

  const handleMarkAsDone = (alertId: string) => {
    setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== alertId));
  };


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
                {alerts.map((alert) => (
                    <div key={alert.id} className={cn("flex items-start gap-4 p-4 border rounded-lg transition-colors", alertBgColors[alert.type])}>
                    <div className="mt-1">{alertIcons[alert.type]}</div>
                    <div className="flex-1">
                        <p className="text-sm font-medium">{alert.message}</p>
                        <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(alert.createdAt), { addSuffix: true })}
                        </p>
                    </div>
                     <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => handleMarkAsDone(alert.id)}>
                        <Check className="h-4 w-4" />
                        <span className="sr-only">Mark as done</span>
                    </Button>
                    </div>
                ))}
                {(alerts.length === 0 || isLoading) && (
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

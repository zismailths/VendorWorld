
"use client";

import { useState, useCallback } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { alerts } from "@/lib/data";
import { formatDistanceToNow } from "date-fns";
import { AlertTriangle, Trophy, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

const alertIcons: Record<Alert['type'], JSX.Element> = {
  RANK_1: <Trophy className="h-5 w-5 text-amber-600" />,
  UNDERCUT: <AlertTriangle className="h-5 w-5 text-red-600" />,
};

const alertBgColors: Record<Alert['type'], string> = {
    RANK_1: "bg-amber-50 border-amber-200",
    UNDERCUT: "bg-red-50 border-red-200",
}

export default function AlertsPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = useCallback(() => {
    // In a real app, you'd re-fetch data here.
    // For now, we just force a re-render.
    setRefreshKey(prev => prev + 1);
  }, []);

  return (
    <>
      <PageHeader
        title="Alerts"
        description="Review all your recent account and offer alerts."
      >
        <Button variant="outline" onClick={handleRefresh}>
          <RefreshCw className="mr-2 h-4 w-4" />
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
                    <div key={alert.id} className={cn("flex items-start gap-4 p-4 border rounded-lg", alertBgColors[alert.type])}>
                    <div className="mt-1">{alertIcons[alert.type]}</div>
                    <div className="flex-1">
                        <p className="text-sm font-medium">{alert.message}</p>
                        <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(alert.createdAt), { addSuffix: true })}
                        </p>
                    </div>
                    </div>
                ))}
                {alerts.length === 0 && (
                    <div className="text-center text-muted-foreground py-8">
                        No new alerts.
                    </div>
                )}
                </div>
            </CardContent>
        </Card>
      </main>
    </>
  );
}

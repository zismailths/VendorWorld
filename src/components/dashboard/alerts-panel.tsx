
"use client";

import { useContext } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Trophy, PlusCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { AlertContext } from "@/context/alert-context";
import type { Alert } from "@/lib/types";

const alertIcons: Record<Alert['type'], JSX.Element> = {
  RANK_1: <Trophy className="h-5 w-5 text-green-500" />,
  UNDERCUT: <AlertTriangle className="h-5 w-5 text-destructive" />,
  NEW_OFFER: <PlusCircle className="h-5 w-5 text-amber-500" />
};

export function AlertsPanel() {
  const { alerts } = useContext(AlertContext);
  const recentAlerts = alerts.slice(0, 3); // Show only the top 3 on the dashboard

  return (
    <Card className="col-span-2 h-full transition-shadow hover:shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Alerts</CardTitle>
        <CardDescription>Recent notifications about your offers.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentAlerts.map((alert) => (
            <div key={alert.id} className="flex items-start gap-4">
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
  );
}

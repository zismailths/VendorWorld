import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Trophy } from "lucide-react";
import { alerts } from "@/lib/data";
import { formatDistanceToNow } from "date-fns";

const alertIcons = {
  RANK_1: <Trophy className="h-5 w-5 text-amber-500" />,
  UNDERCUT: <AlertTriangle className="h-5 w-5 text-destructive" />,
};

export function AlertsPanel() {
  return (
    <Card className="col-span-2 h-full transition-shadow hover:shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Alerts</CardTitle>
        <CardDescription>Recent notifications about your offers.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
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

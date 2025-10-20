
"use client";

import { useContext, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { AlertTriangle, Trophy, PlusCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { AlertContext } from "@/context/alert-context";
import type { Alert } from "@/lib/types";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";

const alertIcons: Record<Alert['type'], JSX.Element> = {
  RANK_1: <Trophy className="h-5 w-5 text-green-600" />,
  UNDERCUT: <AlertTriangle className="h-5 w-5 text-red-600" />,
  NEW_OFFER: <PlusCircle className="h-5 w-5 text-amber-600" />
};

export function AlertsPanel() {
  const { alerts } = useContext(AlertContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  const displayedAlerts = isExpanded ? alerts : alerts.slice(0, 3);

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Navigate only if the click is not on the button or its children
    if (!(e.target instanceof HTMLElement && e.target.closest('button'))) {
        router.push('/notifications');
    }
  };


  return (
    <Card className="col-span-2 h-full transition-shadow hover:shadow-lg cursor-pointer" onClick={handleCardClick}>
      <CardHeader>
        <CardTitle className="font-headline text-xl">Alerts</CardTitle>
        <CardDescription>Recent notifications about your offers.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayedAlerts.map((alert) => (
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
       {alerts.length > 3 && (
        <CardFooter>
          <Button
            variant="outline"
            className="w-full"
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click event
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? "Show Less" : `Show All (${alerts.length})`}
            {isExpanded ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

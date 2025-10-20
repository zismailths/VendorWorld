import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, RefreshCw } from "lucide-react";

export default function CompetitorsPage() {
  return (
    <>
      <PageHeader
        title="Competitors"
        description="Analyze the competitive landscape for your products."
      >
        <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
        </Button>
        <Button>
            <Download className="mr-2 h-4 w-4" />
            Export
        </Button>
      </PageHeader>
      <main className="p-6 pt-0">
        <Card>
          <CardHeader>
            <CardTitle>Competitor Analysis</CardTitle>
            <CardDescription>
              This feature is coming soon. You'll be able to see how your offers stack up against the competition.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-64 bg-muted/50 rounded-lg">
                <p className="text-muted-foreground">Competitor data will appear here.</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}

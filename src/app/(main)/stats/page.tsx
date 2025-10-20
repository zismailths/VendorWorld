import { PageHeader } from "@/components/shared/page-header";
import { PerformanceChart } from "@/components/stats/performance-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Target } from "lucide-react";
import { stats } from "@/lib/data";

const KeyMetricCard = ({ title, value, icon: Icon, trend }: { title: string, value: string, icon: React.ElementType, trend: string }) => (
    <Card>
        <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center justify-between">
                <span>{title}</span>
                <Icon className="h-5 w-5 text-muted-foreground" />
            </CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-3xl font-bold">{value}</p>
            <p className="text-xs text-muted-foreground">{trend}</p>
        </CardContent>
    </Card>
);

export default function StatsPage() {
    return (
        <>
            <PageHeader
                title="Performance Statistics"
                description="Analyze your sales history and offer performance."
            />
            <main className="p-6 pt-0 grid gap-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <KeyMetricCard title="Average Rank" value={`#${stats.averageRank}`} icon={Target} trend="vs. #2.5 last month" />
                    <KeyMetricCard title="Offers Sold" value={stats.soldVsWithdrawn.sold.toString()} icon={TrendingUp} trend="+5 from last month" />
                    <KeyMetricCard title="Offers Withdrawn" value={stats.soldVsWithdrawn.withdrawn.toString()} icon={TrendingDown} trend="-2 from last month" />
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    <PerformanceChart />
                    <Card>
                         <CardHeader>
                            <CardTitle className="font-headline text-xl">More Stats Coming Soon</CardTitle>
                            <CardDescription>We're working on adding more detailed analytics.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <div className="flex items-center justify-center h-48 bg-muted/50 rounded-lg">
                                <p className="text-muted-foreground">Future charts will appear here.</p>
                           </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </>
    );
}

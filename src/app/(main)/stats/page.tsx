
"use client"

import { PageHeader } from "@/components/shared/page-header";
import { PerformanceChart } from "@/components/stats/performance-chart";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Target, RefreshCw, Download, Laptop, HandCoins, IndianRupee } from "lucide-react";
import { stats } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const KeyMetricCard = ({ title, value, icon: Icon, trend, iconColor, className }: { title: string, value: string, icon: React.ElementType, trend: string, iconColor?: string, className?: string }) => (
    <Card className={className}>
        <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center justify-between">
                <span>{title}</span>
                <Icon className={cn("h-5 w-5 text-muted-foreground", iconColor)} />
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
            <main className="p-6 pt-0 grid gap-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <KeyMetricCard 
                        title="Average Rank" 
                        value={`#${stats.averageRank}`} 
                        icon={Target} 
                        trend="vs. #2.5 last month" 
                        iconColor="text-amber-700" 
                        className="bg-amber-100/50 dark:bg-amber-900/20 border-amber-200"
                    />
                    <KeyMetricCard 
                        title="Offers Sold" 
                        value={stats.soldVsWithdrawn.sold.toString()} 
                        icon={TrendingUp} 
                        trend="+5 from last month" 
                        iconColor="text-emerald-700" 
                        className="bg-emerald-100/50 dark:bg-emerald-900/20 border-emerald-200"
                    />
                    <KeyMetricCard 
                        title="Offers Withdrawn" 
                        value={stats.soldVsWithdrawn.withdrawn.toString()} 
                        icon={TrendingDown} 
                        trend="-2 from last month" 
                        iconColor="text-red-700"
                        className="bg-red-100/50 dark:bg-red-900/20 border-red-200"
                    />
                    <KeyMetricCard 
                        title="Total Active Offers" 
                        value={stats.totalActiveOffers.toString()} 
                        icon={Laptop} 
                        trend="from all time" 
                        iconColor="text-sky-700"
                        className="bg-sky-100/50 dark:bg-sky-900/20 border-sky-200"
                    />
                    <KeyMetricCard 
                        title="Laptops Sold" 
                        value={stats.totalLaptopsSold.toString()} 
                        icon={HandCoins} 
                        trend="All time sales" 
                        iconColor="text-violet-700"
                        className="bg-violet-100/50 dark:bg-violet-900/20 border-violet-200"
                    />
                     <KeyMetricCard 
                        title="Lifetime Revenue" 
                        value={new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(stats.lifetimeRevenue)} 
                        icon={IndianRupee} 
                        trend="All time revenue" 
                        iconColor="text-green-700"
                        className="bg-green-100/50 dark:bg-green-900/20 border-green-200"
                    />
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

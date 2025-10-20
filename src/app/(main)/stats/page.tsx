
"use client"

import { PageHeader } from "@/components/shared/page-header";
import { PerformanceChart } from "@/components/stats/performance-chart";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Target, RefreshCw, Download, Laptop, HandCoins, IndianRupee } from "lucide-react";
import { stats } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const KeyMetricCard = ({ title, value, icon: Icon, trend, iconColor, className }: { title: string, value: string, icon: React.ElementType, trend: string, iconColor?: string, className?: string }) => (
    <Card className={cn("text-white", className)}>
        <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center justify-between">
                <span>{title}</span>
                <Icon className={cn("h-5 w-5", iconColor)} />
            </CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-3xl font-bold">{value}</p>
            <p className="text-xs text-white/80">{trend}</p>
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
                        iconColor="text-white/90" 
                        className="bg-amber-500"
                    />
                    <KeyMetricCard 
                        title="Offers Sold" 
                        value={stats.soldVsWithdrawn.sold.toString()} 
                        icon={TrendingUp} 
                        trend="+5 from last month" 
                        iconColor="text-white/90" 
                        className="bg-emerald-500"
                    />
                    <KeyMetricCard 
                        title="Offers Withdrawn" 
                        value={stats.soldVsWithdrawn.withdrawn.toString()} 
                        icon={TrendingDown} 
                        trend="-2 from last month" 
                        iconColor="text-white/90"
                        className="bg-red-500"
                    />
                    <KeyMetricCard 
                        title="Total Active Offers" 
                        value={stats.totalActiveOffers.toString()} 
                        icon={Laptop} 
                        trend="from all time" 
                        iconColor="text-white/90"
                        className="bg-sky-500"
                    />
                    <KeyMetricCard 
                        title="Laptops Sold" 
                        value={stats.totalLaptopsSold.toString()} 
                        icon={HandCoins} 
                        trend="All time sales" 
                        iconColor="text-white/90"
                        className="bg-violet-500"
                    />
                     <KeyMetricCard 
                        title="Lifetime Revenue" 
                        value={new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(stats.lifetimeRevenue)} 
                        icon={IndianRupee} 
                        trend="All time revenue" 
                        iconColor="text-white/90"
                        className="bg-green-500"
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

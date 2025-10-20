
import { Laptop, IndianRupee, HandCoins, BarChart } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { SummaryCard } from "@/components/dashboard/summary-card";
import { AlertsPanel } from "@/components/dashboard/alerts-panel";
import { SalesChart } from "@/components/dashboard/sales-chart";
import { stats } from "@/lib/data";
import { PerformanceChart } from "@/components/stats/performance-chart";

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Here's a summary of your seller activity."
      />
      <main className="p-6 pt-0 grid gap-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            title="Total Products"
            value={stats.totalActiveOffers.toString()}
            Icon={Laptop}
             description="+12% from last month"
             iconColor="text-white/90"
             className="bg-sky-400 text-white hover:bg-sky-500"
          />
          <SummaryCard
            title="Active Listings"
            value={stats.totalLaptopsSold.toString()}
            Icon={HandCoins}
            description="+8% from last month"
            iconColor="text-white/90"
            className="bg-emerald-400 text-white hover:bg-emerald-500"
          />
           <SummaryCard
            title="Average Rank"
            value={`#${stats.averageRank}`}
            Icon={BarChart}
            description="-2 positions"
            iconColor="text-white/90"
            className="bg-amber-400 text-white hover:bg-amber-500"
          />
          <SummaryCard
            title="Monthly Revenue"
            value={new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', minimumFractionDigits: 0 }).format(stats.lifetimeRevenue)}
            Icon={IndianRupee}
            description="+18% from last month"
            iconColor="text-white/90"
            className="bg-violet-400 text-white hover:bg-violet-500"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
                <SalesChart />
            </div>
             <div className="lg:col-span-1">
                <AlertsPanel />
            </div>
        </div>
         <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1">
                <PerformanceChart />
            </div>
         </div>
      </main>
    </>
  );
}

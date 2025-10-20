import { Laptop, IndianRupee, HandCoins } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { SummaryCard } from "@/components/dashboard/summary-card";
import { AlertsPanel } from "@/components/dashboard/alerts-panel";
import { SalesChart } from "@/components/dashboard/sales-chart";
import { stats } from "@/lib/data";

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
          />
          <SummaryCard
            title="Active Listings"
            value={stats.totalLaptopsSold.toString()}
            Icon={HandCoins}
            description="+8% from last month"
          />
           <SummaryCard
            title="Average Rank"
            value={`#${stats.averageRank}`}
            Icon={IndianRupee}
            description="-2 positions"
          />
          <SummaryCard
            title="Monthly Revenue"
            value={new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(stats.lifetimeRevenue)}
            Icon={IndianRupee}
            description="+18% from last month"
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
      </main>
    </>
  );
}

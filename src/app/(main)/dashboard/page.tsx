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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <SummaryCard
            title="Total Active Offers"
            value={stats.totalActiveOffers.toString()}
            Icon={Laptop}
          />
          <SummaryCard
            title="Total Laptops Sold"
            value={stats.totalLaptopsSold.toString()}
            Icon={HandCoins}
            description="+2 in the last 30 days"
          />
          <SummaryCard
            title="Lifetime Revenue"
            value={new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(stats.lifetimeRevenue)}
            Icon={IndianRupee}
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

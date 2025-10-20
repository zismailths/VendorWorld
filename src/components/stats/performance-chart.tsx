
"use client"

import * as React from "react"
import { Pie, PieChart, Cell } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { sellerOffers, stats } from "@/lib/data"

const activeCount = sellerOffers.filter(o => o.isSellerOffer && o.status === 'ACTIVE').length;
const soldCount = sellerOffers.filter(o => o.isSellerOffer && o.status === 'SOLD').length;
const expiredCount = sellerOffers.filter(o => o.isSellerOffer && o.status === 'EXPIRED').length;

const chartData = [
  { type: "Active", count: activeCount, fill: "var(--color-active)" },
  { type: "Sold", count: soldCount, fill: "var(--color-sold)" },
  { type: "Expired", count: expiredCount, fill: "var(--color-expired)" },
  { type: "Withdrawn", count: stats.soldVsWithdrawn.withdrawn, fill: "var(--color-withdrawn)" },
]

const chartConfig = {
  count: {
    label: "Count",
  },
  active: {
    label: "Active",
    color: "hsl(var(--chart-1))", // Blue
  },
  sold: {
    label: "Sold",
    color: "hsl(var(--chart-2))", // Green
  },
  expired: {
    label: "Expired",
    color: "hsl(var(--muted-foreground))", // Gray
  },
  withdrawn: {
    label: "Withdrawn",
    color: "hsl(var(--destructive))", // Red
  },
}

export function PerformanceChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Product Status Overview</CardTitle>
        <CardDescription>A breakdown of all your product offers by status</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="type"
              innerRadius={60}
              strokeWidth={5}
            >
                {chartData.map((entry) => (
                    <Cell key={`cell-${entry.type}`} fill={entry.fill} />
                ))}
            </Pie>
             <ChartLegend
              content={<ChartLegendContent nameKey="type" />}
              className="-mt-4"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

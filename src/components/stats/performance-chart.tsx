"use client"

import * as React from "react"
import { Pie, PieChart } from "recharts"

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
import { stats } from "@/lib/data"

const chartData = [
  { type: "Sold", count: stats.soldVsWithdrawn.sold, fill: "var(--color-sold)" },
  { type: "Withdrawn", count: stats.soldVsWithdrawn.withdrawn, fill: "var(--color-withdrawn)" },
]

const chartConfig = {
  count: {
    label: "Count",
  },
  sold: {
    label: "Sold",
    color: "hsl(var(--chart-1))",
  },
  withdrawn: {
    label: "Withdrawn",
    color: "hsl(var(--chart-2))",
  },
}

export function PerformanceChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Offer Outcomes</CardTitle>
        <CardDescription>Ratio of sold vs. withdrawn offers</CardDescription>
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
            />
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

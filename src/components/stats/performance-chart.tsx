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
    color: "hsl(142.1 76.2% 36.3%)", // Green
  },
  withdrawn: {
    label: "Withdrawn",
    color: "hsl(0 84.2% 60.2%)", // Red
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

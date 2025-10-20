
"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { activeProductsData } from "@/lib/data";

const chartConfig = {
  count: {
    label: "Active Products",
    color: "hsl(var(--chart-2))",
  },
};

export function ActiveProductsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-xl">Active Product Trends</CardTitle>
        <CardDescription>Your active product count over the last 6 months.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <LineChart data={activeProductsData} accessibilityLayer margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis 
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                domain={['dataMin - 5', 'dataMax + 5']}
            />
             <Tooltip
              cursor={true}
              content={<ChartTooltipContent
                indicator="line"
                labelFormatter={(value) => `Month: ${value}`}
              />}
            />
            <Line dataKey="count" type="monotone" stroke="var(--color-count)" strokeWidth={2} dot={true} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

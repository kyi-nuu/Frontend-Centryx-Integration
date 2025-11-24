'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Bolt } from 'lucide-react';

const chartData = [
  { time: '00:00', kWh: 1.5 },
  { time: '02:00', kWh: 1.4 },
  { time: '04:00', kWh: 1.8 },
  { time: '06:00', kWh: 2.5 },
  { time: '08:00', kWh: 4.1 },
  { time: '10:00', kWh: 5.5 },
  { time: '12:00', kWh: 6.8 },
  { time: '14:00', kWh: 7.2 },
  { time: '16:00', kWh: 7.0 },
  { time: '18:00', kWh: 6.5 },
  { time: '20:00', kWh: 8.2 },
  { time: '22:00', kWh: 7.5 },
  { time: 'Now', kWh: 7.2 },
];

const chartConfig = {
  kWh: {
    label: 'kWh',
    color: 'hsl(var(--chart-2))',
  },
};

export function EnergyUsageChart() {
  return (
    <Card className="h-full">
      <CardHeader className="py-2 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bolt className="h-4 w-4 text-green-500" />
            <h3 className="font-semibold text-foreground text-sm">Energy Usage Today</h3>
          </div>
          <div className="flex items-center gap-2">
             <Badge variant="outline" className="border-green-500 text-green-500 bg-transparent text-xs px-2 py-0.5">
              Live
            </Badge>
            <span className="font-bold text-sm text-foreground">7.2 kWh</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 h-[160px]">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <AreaChart
            data={chartData}
            margin={{
              top: 5,
              right: 10,
              left: -30,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorKWh" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-kWh)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="var(--color-kWh)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
              className="text-[10px]"
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} domain={[0, 12]} className="text-[10px]" />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="kWh"
              type="monotone"
              stroke="var(--color-kWh)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorKWh)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

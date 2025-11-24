import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import React from 'react';
import { cn } from '@/lib/utils';
import { Check, X, Video, Lightbulb } from 'lucide-react';
import { Badge } from '../ui/badge';

type StatsCardProps = {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  status: string;
  total: number;
  online: number;
  offline: number;
  statusColor: string;
};

export function StatsCard({
  title,
  subtitle,
  icon,
  status,
  total,
  online,
  offline,
}: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="p-3 pb-2">
        <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-sm font-semibold">{title}</CardTitle>
              <CardDescription className="text-xs">{subtitle}</CardDescription>
            </div>
           <Badge variant="outline" className={cn('text-xs py-0.5 px-2', title === 'Cameras' ? 'border-blue-500 text-blue-500' : 'border-yellow-500 text-yellow-500')}>
            <div className={cn('w-2 h-2 rounded-full mr-1.5', title === 'Cameras' ? 'bg-blue-500' : 'bg-yellow-500')} />
            {status}
           </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <div className="flex items-center justify-center my-2 p-4 rounded-lg bg-card-foreground/5">
          {icon}
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 rounded-lg border border-border">
              <p className="text-[10px] text-muted-foreground">Total</p>
              <p className="text-lg font-bold">{total}</p>
            </div>
            <div className="p-2 rounded-lg border border-green-500/50 bg-green-500/10">
              <p className="text-[10px] text-green-500">Online</p>
              <p className="text-lg font-bold text-green-500">{online}</p>
            </div>
             <div className="p-2 rounded-lg border border-red-500/50 bg-red-500/10">
              <p className="text-[10px] text-red-500">Offline</p>
              <p className="text-lg font-bold text-red-500">{offline}</p>
            </div>
          </div>
      </CardContent>
    </Card>
  );
}

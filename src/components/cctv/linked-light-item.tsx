
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Switch } from '../ui/switch';

type LinkedLightItemProps = {
  light: {
    name: string;
    location: string;
    brightness: number;
    isOn: boolean;
  };
};

export function LinkedLightItem({ light }: LinkedLightItemProps) {
  return (
    <Card className={cn('bg-secondary/50', light.isOn && 'border-yellow-500/30')}>
      <CardContent className="p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className={cn("rounded-lg p-2", light.isOn ? "bg-yellow-400/20 text-yellow-400" : "bg-card text-muted-foreground")}>
                <Lightbulb className="h-5 w-5" />
            </div>
            <div>
                <p className="font-semibold text-sm">{light.name}</p>
                <p className="text-xs text-muted-foreground">{light.location}</p>
            </div>
        </div>
        <div className="flex items-center gap-4">
            <div>
                <p className="text-xs text-muted-foreground text-right">Brightness</p>
                <p className="font-semibold text-sm text-right">{light.brightness}%</p>
            </div>
            <Switch checked={light.isOn} />
        </div>
      </CardContent>
    </Card>
  );
}


'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

type LightCardProps = {
  name: string;
  room: string;
  isOn: boolean;
  brightness?: number;
  onToggle: (isOn: boolean) => void;
  onBrightnessChange: (brightness: number) => void;
};

export function LightCard({
  name,
  room,
  isOn,
  brightness = 0,
  onToggle,
  onBrightnessChange,
}: LightCardProps) {
  return (
    <Card className={cn('flex flex-col', isOn && 'border-yellow-500/50')}>
      <CardHeader className="flex flex-row items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <div className={cn("rounded-lg p-2", isOn ? "bg-yellow-400/20 text-yellow-400" : "bg-secondary text-muted-foreground")}>
            <Lightbulb className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-foreground">{name}</h3>
            <p className="text-xs text-muted-foreground">{room}</p>
          </div>
        </div>
        <Switch checked={isOn} onCheckedChange={onToggle} />
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-center p-3 pt-0">
        {isOn ? (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Brightness</span>
              <span className="text-xs font-semibold">{brightness}%</span>
            </div>
            <Slider
              value={[brightness]}
              onValueChange={(value) => onBrightnessChange(value[0])}
              max={100}
              step={1}
              disabled={!isOn}
            />
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-xs text-muted-foreground">Light is off</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

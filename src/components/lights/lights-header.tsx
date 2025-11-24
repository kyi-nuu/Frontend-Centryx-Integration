'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Sun, Moon, Zap } from 'lucide-react';
import { PowerOffIcon } from '../icons/power-off-icon';
import { cn } from '@/lib/utils';

type Mode = 'day' | 'night' | 'eco' | null;

type LightsHeaderProps = {
  onFilterChange: (filter: 'all' | 'on' | 'off') => void;
  onModeChange: (mode: Mode) => void;
  activeMode: Mode;
  onToggleAll: (state: boolean) => void;
  onCount: number;
  offCount: number;
  onSearchChange: (term: string) => void;
};

export function LightsHeader({
  onFilterChange,
  onModeChange,
  activeMode,
  onToggleAll,
  onCount,
  offCount,
  onSearchChange,
}: LightsHeaderProps) {
  const modeCards = [
    {
      id: 'day',
      label: 'Day Mode',
      icon: Sun,
      color: 'bg-blue-200/50 dark:bg-blue-900/30 border-blue-300/50 dark:border-blue-700/50 text-blue-500 dark:text-blue-400',
      activeColor: 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
    },
    {
      id: 'night',
      label: 'Night Mode',
      icon: Moon,
      color: 'bg-purple-200/50 dark:bg-purple-900/30 border-purple-300/50 dark:border-purple-700/50 text-purple-500 dark:text-purple-400',
      activeColor: 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
    },
    {
      id: 'eco',
      label: 'Eco Mode',
      icon: Zap,
      color: 'bg-green-200/50 dark:bg-green-900/30 border-green-300/50 dark:border-green-700/50 text-green-500 dark:text-green-400',
      activeColor: 'bg-green-500/20 text-green-400 border border-green-500/30'
    },
  ];

  return (
    <div className="bg-transparent">
      <CardContent className="p-4 sm:p-6 lg:p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Lighting Control</h1>
          <p className="text-muted-foreground">Manage all smart lights in your building</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-grow sm:flex-grow-0 sm:w-[400px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search light by name or location" 
              className="pl-10 bg-input" 
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <div className="flex-grow" />
          <div className="flex items-center gap-2">
            <Button variant="destructive" className="hidden sm:flex" onClick={() => onToggleAll(true)}>Turn all on</Button>
            <Button variant="ghost" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Tabs defaultValue="all" onValueChange={(value) => onFilterChange(value as any)}>
              <TabsList>
                <TabsTrigger value="all">All ({onCount + offCount})</TabsTrigger>
                <TabsTrigger value="on">On ({onCount})</TabsTrigger>
                <TabsTrigger value="off">Off ({offCount})</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {modeCards.map((card) => (
            <Card 
              key={card.label} 
              className={cn(
                'cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95',
                activeMode === card.id ? card.activeColor : card.color
              )}
              onClick={() => onModeChange(activeMode === card.id ? null : card.id as Mode)}
            >
              <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
                <card.icon className={cn('h-6 w-6', activeMode === card.id && (card.id === 'day' ? 'fill-blue-400' : card.id === 'night' ? 'fill-purple-400' : 'fill-green-400'))}/>
                <span className="text-sm font-medium">{card.label}</span>
              </CardContent>
            </Card>
          ))}
           <Card 
              className='cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95 bg-red-200/50 dark:bg-red-900/30 border-red-300/50 dark:border-red-700/50 text-red-500 dark:text-red-400'
              onClick={() => onToggleAll(false)}
            >
              <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
                <PowerOffIcon className="h-6 w-6" />
                <span className="text-sm font-medium">All Off</span>
              </CardContent>
            </Card>
        </div>
      </CardContent>
    </div>
  );
}
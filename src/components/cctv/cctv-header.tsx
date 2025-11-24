
'use client';

import { CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Monitor, Video } from 'lucide-react';
import type { CctvView, FilterStatus } from '@/app/cctv/page';

type CctvHeaderProps = {
  activeView: CctvView;
  onSetView: (view: CctvView) => void;
  onSearchChange: (term: string) => void;
  onFilterChange: (status: FilterStatus) => void;
  onlineCount: number;
  offlineCount: number;
};

export function CctvHeader({ 
    activeView, 
    onSetView,
    onSearchChange,
    onFilterChange,
    onlineCount,
    offlineCount,
}: CctvHeaderProps) {
  return (
    <div className="bg-transparent">
      <CardContent className="p-4 sm:p-6 lg:p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">CCTV Monitoring</h1>
          <p className="text-muted-foreground">Live surveillance camera feeds and monitoring</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-grow sm:flex-grow-0 sm:w-[400px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
                placeholder="Search camera by name or location" 
                className="pl-10 bg-input" 
                onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={activeView === 'grid' || activeView === 'live-monitoring' ? 'default' : 'secondary'}
              onClick={() => onSetView('live-monitoring')}
            >
              <Monitor className="mr-2 h-4 w-4" />
              Live Monitoring
            </Button>
            <Button
              variant={activeView === 'recordings' ? 'default' : 'secondary'}
              onClick={() => onSetView('recordings')}
            >
              <Video className="mr-2 h-4 w-4" />
              Recordings
            </Button>
          </div>
          <div className="flex-grow" />
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Tabs defaultValue="all" onValueChange={(value) => onFilterChange(value as FilterStatus)}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="online">Online ({onlineCount})</TabsTrigger>
                <TabsTrigger value="offline">Offline ({offlineCount})</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardContent>
    </div>
  );
}

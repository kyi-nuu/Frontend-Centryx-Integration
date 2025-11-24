
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2, Video, Lightbulb, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Device } from './add-device-card';
import { DeleteDeviceDialog } from './delete-device-dialog';

type DeviceListItemProps = {
  item: Device;
  onDelete: (id: string) => void;
};

function DeviceListItem({ item, onDelete }: DeviceListItemProps) {
  const isLight = item.icon === 'light';
  const IconComponent = isLight ? Lightbulb : Video;
  const [brand, ...modelParts] = item.details.split(' ');
  const model = modelParts.join(' ');
  
  return (
    <div
      className='flex items-center p-3 rounded-lg hover:bg-secondary/50 transition-colors group'
    >
      <div className={cn('flex items-center gap-4 flex-1 w-full')}>
        <div
          className={cn(
            'rounded-lg p-3',
            isLight
              ? 'bg-yellow-400/20 text-yellow-400'
              : 'bg-blue-500/20 text-blue-500'
          )}
        >
          <IconComponent className="h-5 w-5" />
        </div>
        <div>
          <p className="font-semibold text-foreground text-sm">{item.name}</p>
          <p className="text-xs text-muted-foreground">{item.description}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
            <p className="font-semibold text-foreground text-sm">{brand}</p>
            <p className="text-xs text-muted-foreground">{model}</p>
        </div>
        <DeleteDeviceDialog onConfirm={() => onDelete(item.id)}>
          <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 ml-2 shrink-0 h-9 w-9 rounded-full"
          >
              <Trash2 className="h-4 w-4" />
          </Button>
        </DeleteDeviceDialog>
      </div>
    </div>
  );
}

type DeviceListProps = {
  title: string;
  searchPlaceholder: string;
  items: Device[];
  onDelete: (id: string) => void;
};

export function DeviceList({
  title,
  searchPlaceholder,
  items,
  onDelete,
}: DeviceListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="flex flex-col bg-card/50">
      <CardHeader className="p-4">
        <CardTitle>{title}</CardTitle>
        <div className="relative mt-2">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            className="bg-background h-11 pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-2 pt-0">
        <ScrollArea className="h-[400px]">
            <div className="space-y-1 p-2 pr-4">
            {filteredItems.map((item) => (
                <DeviceListItem
                key={item.id}
                item={item}
                onDelete={onDelete}
                />
            ))}
            </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function AddDeviceForm() {
  return (
    <Card className="bg-card/50">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input placeholder="Name" className="bg-background h-11" />
          <Input placeholder="Location" className="bg-background h-11" />
          <Select>
            <SelectTrigger className="h-11 bg-background">
              <SelectValue placeholder="Select brand" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hikvision">Hikvision</SelectItem>
              <SelectItem value="dahua">Dahua</SelectItem>
              <SelectItem value="axis">Axis</SelectItem>
              <SelectItem value="bosch">Bosch</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}

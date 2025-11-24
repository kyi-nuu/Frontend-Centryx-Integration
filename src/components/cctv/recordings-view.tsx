'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DateTimePicker } from '@/components/ui/date-time-picker';
import { Calendar as CalendarIcon, Clock, Filter, Video } from 'lucide-react';

export function RecordingsView() {
  return (
    <div className="flex flex-col items-center">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <div className="flex items-center gap-3">
            <CalendarIcon className="h-6 w-6 text-primary" />
            <div>
              <CardTitle>Filter Recordings</CardTitle>
              <CardDescription>Search by date and time range</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                Start Date & Time
              </label>
              <DateTimePicker />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                End Date & Time
              </label>
              <DateTimePicker />
            </div>
            <div className="md:col-span-2">
              <Button className="w-full md:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                Apply Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-col items-center justify-center text-center mt-20">
        <div className="p-6 bg-primary/10 rounded-lg">
            <Video className="h-16 w-16 text-primary" />
        </div>
        <p className="mt-6 text-lg font-semibold">Apply Filter to View Recordings</p>
      </div>
    </div>
  );
}

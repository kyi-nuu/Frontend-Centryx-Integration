
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Camera as CameraIcon, MapPin, Link as LinkIcon, BarChart, Video, Clock, Filter } from 'lucide-react';
import type { Camera } from '@/app/cctv/page';
import { LinkedLightItem } from './linked-light-item';
import { DateTimePicker } from '../ui/date-time-picker';
import { Button } from '../ui/button';

type CameraInfoDialogProps = {
  camera: Camera | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CameraInfoDialog({ camera, open, onOpenChange }: CameraInfoDialogProps) {
  if (!camera) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl h-[90vh] flex flex-col p-0 gap-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/20 rounded-lg">
                <CameraIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-foreground">{camera.name}</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                {camera.brand} • {camera.model}
              </DialogDescription>
            </div>
          </div>
          {camera.isRecording && (
            <Badge variant="destructive" className="mt-4 w-fit">
              <div className="w-2 h-2 rounded-full bg-white mr-2 animate-pulse" />
              Recording
            </Badge>
          )}
        </DialogHeader>

        <ScrollArea className="flex-1">
          <div className="p-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BarChart className="h-5 w-5 text-primary" />
                  Camera Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Location</p>
                    <p className="font-semibold">{camera.location}</p>
                  </div>
                </div>
                 <div className="flex items-center gap-2">
                  <LinkIcon className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Total Lights Linked</p>
                    <p className="font-semibold">{camera.linkedLights.length} Lights</p>
                  </div>
                </div>
              </CardContent>
            </Card>

             <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <LinkIcon className="h-5 w-5 text-primary" />
                  Linked Lights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {camera.linkedLights.length > 0 ? (
                  camera.linkedLights.map((light, index) => (
                    <LinkedLightItem key={index} light={light} />
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm text-center py-4">
                    No lights are linked to this camera.
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <Video className="h-5 w-5 text-primary" />
                        Camera Recordings
                    </CardTitle>
                    <p className="text-sm text-muted-foreground pt-1">Filter recordings by date and time</p>
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
                     <div className="flex flex-col items-center justify-center text-center mt-12">
                        <div className="p-4 bg-primary/10 rounded-lg">
                            <Video className="h-10 w-10 text-primary" />
                        </div>
                        <p className="mt-4 text-sm text-muted-foreground">Apply filter to view recordings for this camera</p>
                    </div>
                </CardContent>
            </Card>

          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

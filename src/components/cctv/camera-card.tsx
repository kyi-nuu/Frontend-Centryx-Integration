
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Info, Expand, VideoOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Camera } from '@/app/cctv/page';

type CameraCardProps = {
  camera: Camera;
  onInfoClick: () => void;
  onExpandClick: () => void;
};

export function CameraCard({
  camera,
  onInfoClick,
  onExpandClick,
}: CameraCardProps) {
  const isOnline = camera.status === 'online';

  return (
    <Card className="overflow-hidden bg-card">
      <CardContent className="p-0">
        <div className="relative aspect-video">
          {isOnline ? (
            <>
              <Image
                src={camera.imageUrl}
                alt={`View of ${camera.name}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint="surveillance footage"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            </>
          ) : (
             <div className="absolute inset-0 bg-muted" />
          )}

          {isOnline ? (
            <>
              {camera.isRecording && (
                <Badge variant="destructive" className="absolute top-3 left-3 h-6 gap-1.5 pl-2 pr-2.5">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span>REC</span>
                </Badge>
              )}
              <Badge variant="secondary" className="absolute top-3 right-3 bg-black/50 text-white border-transparent">
                1080p
              </Badge>
              <div className="absolute bottom-3 right-3 flex gap-2">
                <button
                  onClick={onInfoClick}
                  className="h-8 w-8 rounded-md bg-black/50 text-white/80 hover:bg-black/80 hover:text-white flex items-center justify-center transition-colors"
                >
                  <Info className="h-4 w-4" />
                </button>
                <button
                  onClick={onExpandClick}
                  className="h-8 w-8 rounded-md bg-black/50 text-white/80 hover:bg-black/80 hover:text-white flex items-center justify-center transition-colors"
                >
                  <Expand className="h-4 w-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-card/50">
              <VideoOff className="h-12 w-12 text-muted-foreground" />
              <p className="mt-2 text-sm font-medium text-muted-foreground">Offline</p>
            </div>
          )}
        </div>
        <div className="p-3">
          <h3 className="font-semibold text-foreground truncate">{camera.name}</h3>
          <p className="text-sm text-muted-foreground">{camera.location}</p>
        </div>
      </CardContent>
    </Card>
  );
}

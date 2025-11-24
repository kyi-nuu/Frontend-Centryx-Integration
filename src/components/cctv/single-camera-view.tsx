
'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import type { Camera } from '@/app/cctv/page';

type SingleCameraViewProps = {
  camera: Camera;
  onClose: () => void;
};

export function SingleCameraView({ camera, onClose }: SingleCameraViewProps) {
  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
      <Image
        src={camera.imageUrl}
        alt={`Live feed from ${camera.name}`}
        fill
        className="object-contain"
        data-ai-hint="surveillance footage"
      />
      <div className="absolute inset-0 bg-black/30" />
      
      <Badge
        variant="secondary"
        className="absolute top-4 left-4 bg-black/50 text-white border-transparent text-sm px-3 py-1"
      >
        {camera.name}
      </Badge>

      <Button
        variant="secondary"
        size="icon"
        onClick={onClose}
        className="absolute top-4 right-4 rounded-full h-10 w-10 bg-black/50 hover:bg-black/80 text-white"
      >
        <X className="h-5 w-5" />
        <span className="sr-only">Close full screen view</span>
      </Button>
    </div>
  );
}

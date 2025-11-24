'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Power, LogOut, Sun, Moon, Leaf } from 'lucide-react';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export function QuickActions() {
  const router = useRouter();
  const [activeMode, setActiveMode] = useState<string | null>(null);

  const handleLogout = () => {
    // Remove tokens from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('jwtToken');
    }
    router.push('/');
  };

  const handleModeClick = (mode: string) => {
    setActiveMode(currentMode => currentMode === mode ? null : mode);
  };

  return (
    <Card className="flex-1 flex flex-col">
      <CardHeader className="p-3 pb-2">
        <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <CardTitle className="text-sm font-semibold">Quick Actions</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-2 flex-1 p-3">
        <Button size="sm" className="text-xs bg-primary hover:bg-primary/90 text-primary-foreground flex-col h-auto py-2 transition-transform duration-200 hover:scale-105 active:scale-95">
          <Power className="h-5 w-5 mb-1" /> All On
        </Button>
        <Button size="sm" variant="destructive" className="text-xs flex-col h-auto py-2 transition-transform duration-200 hover:scale-105 active:scale-95">
          <Power className="h-5 w-5 mb-1" /> All Off
        </Button>
        <Button variant="secondary" size="sm" onClick={handleLogout} className="text-xs flex-col h-auto py-2 transition-transform duration-200 hover:scale-105 active:scale-95">
          <LogOut className="h-5 w-5 mb-1" />
          <span>Log Out</span>
        </Button>
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={() => handleModeClick('day')}
          className={cn(
            "text-xs flex-col h-auto py-2 transition-transform duration-200 hover:scale-105 active:scale-95",
            activeMode === 'day' && 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
          )}
        >
          <Sun className={cn("h-5 w-5 mb-1", activeMode === 'day' && "fill-blue-400")} />
          <span>Day Mode</span>
        </Button>
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={() => handleModeClick('night')}
          className={cn(
            "text-xs flex-col h-auto py-2 transition-transform duration-200 hover:scale-105 active:scale-95",
            activeMode === 'night' && 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
          )}
        >
          <Moon className={cn("h-5 w-5 mb-1", activeMode === 'night' && "fill-purple-400")} />
          <span>Night Mode</span>
        </Button>
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={() => handleModeClick('eco')}
          className={cn(
            "text-xs flex-col h-auto py-2 transition-transform duration-200 hover:scale-105 active:scale-95",
            activeMode === 'eco' && 'bg-green-500/20 text-green-400 border border-green-500/30'
          )}
        >
          <Leaf className={cn("h-5 w-5 mb-1", activeMode === 'eco' && "fill-green-400")} />
          <span>Eco Mode</span>
        </Button>
      </CardContent>
    </Card>
  );
}

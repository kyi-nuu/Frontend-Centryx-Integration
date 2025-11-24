"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Camera, Lightbulb, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

export function MotionAutomationCard() {
  const [active, setActive] = useState<boolean>(false);
  const wsRef = useRef<WebSocket | null>(null);
  const retryRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const token = window.localStorage.getItem('accessToken') || window.localStorage.getItem('jwtToken') || '';
    const base = 'wss://frowsily-hunterlike-eneida.ngrok-free.dev/ws/automation/status/';
    let shouldClose = false;

    function scheduleReconnect() {
      retryRef.current = Math.min(10, retryRef.current + 1);
      const timeout = Math.min(30000, 1000 * Math.pow(2, retryRef.current));
      setTimeout(() => {
        if (!shouldClose) connect();
      }, timeout);
    }

    function connect() {
      const url = token ? `${base}?token=${encodeURIComponent(token)}` : base;
      try {
        wsRef.current = new WebSocket(url);
      } catch (e) {
        console.error('Automation websocket connection failed', e);
        scheduleReconnect();
        return;
      }

      wsRef.current.onopen = () => {
        console.debug('Automation websocket connected');
        retryRef.current = 0;
      };

      wsRef.current.onmessage = (ev) => {
        try {
          const data = JSON.parse(ev.data);
          // debug raw payload for easier troubleshooting
          console.debug('Automation WS message', data);

          // Handle multiple possible shapes/keys and string boolean values
          const tryBool = (v: any) => {
            if (typeof v === 'boolean') return v;
            if (typeof v === 'string') {
              const lower = v.toLowerCase();
              if (lower === 'true' || lower === '1') return true;
              if (lower === 'false' || lower === '0') return false;
            }
            if (typeof v === 'number') return v === 1;
            return undefined;
          };

          // Common keys we've seen: automation_status, automation.status, automation_status
          let val: boolean | undefined;
          val = tryBool(data.automation_status ?? data.automationStatus ?? data['automation-status']);
          if (val === undefined && data.automation && (data.automation.status !== undefined)) {
            val = tryBool(data.automation.status);
          }
          if (val === undefined && typeof data.status === 'string') {
            val = data.status.toLowerCase() === 'on';
          }

          if (typeof val === 'boolean') {
            setActive(val);
            return;
          }

          // Fallbacks: check nested fields
          if (data.stats && typeof data.stats.automation_status !== 'undefined') {
            const v = tryBool(data.stats.automation_status);
            if (typeof v === 'boolean') setActive(v);
          }

        } catch (err) {
          console.debug('Non-JSON automation websocket message', ev.data);
        }
      };

      wsRef.current.onclose = (ev) => {
        console.warn('Automation websocket closed', ev.code, ev.reason);
        wsRef.current = null;
        if (!shouldClose) scheduleReconnect();
      };

      wsRef.current.onerror = (e) => {
        console.error('Automation websocket error', e);
        try { wsRef.current?.close(); } catch {}
      };
    }

    connect();

    return () => {
      shouldClose = true;
      try { wsRef.current?.close(); } catch {}
      wsRef.current = null;
    };
  }, []);

  return (
    <Card className={cn('bg-primary/10 border-primary/20')}> 
      <CardContent className="p-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg">
                <Zap className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-base">Motion Automation</h3>
              <div className="flex items-center gap-1.5">
                <div className={cn('h-2 w-2 rounded-full', active ? 'bg-green-500 animate-pulse' : 'bg-gray-400')} />
                <span className={cn('text-sm', active ? 'text-green-600' : 'text-muted-foreground')}>{active ? 'Active' : 'Inactive'}</span>
              </div>
            </div>
          </div>
          <Badge variant="outline" className={cn('text-xs px-2 py-0.5', active ? 'text-green-700 border-green-200 bg-green-50' : 'text-red-600 border-red-200 bg-red-50')}>
            <span className="mr-1.5">{active ? '✓' : '✕'}</span>
            {active ? 'ON' : 'OFF'}
          </Badge>
        </div>
        <div className="flex flex-col items-center justify-center my-1">
            <div className="flex items-center justify-between w-full">
                <div className="relative">
                    <div className="absolute -inset-1 bg-primary/20 rounded-full blur-md" />
                    <Camera className="h-6 w-6 text-primary z-10 relative" />
                </div>
                <div className="flex-1 mx-4 h-1 bg-muted/50 rounded-full relative overflow-hidden">
                    <div className="absolute h-full bg-gradient-to-r from-primary to-yellow-500 w-full" />
                </div>
                <div className="relative">
                    <div className="absolute -inset-1 bg-yellow-500/20 rounded-full blur-md" />
                    <Lightbulb className="h-6 w-6 text-yellow-400 z-10 relative" />
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}

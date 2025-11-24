"use client";

import { useEffect, useRef, useState } from 'react';
import { StatsCard } from '@/components/dashboard/stats-card';
import { QuickActions } from '@/components/dashboard/quick-actions';
import { DashboardHeader } from '@/components/dashboard/header';
import { EnergyUsageCard } from '@/components/dashboard/energy-usage-card';
import { ElectricityHoursCard } from '@/components/dashboard/electricity-hours-card';
import { Lightbulb, Video } from 'lucide-react';
import { MotionAutomationCard } from '@/components/dashboard/motion-automation-card';

export default function DashboardPage() {
  // Protect route: redirect to login if not authenticated
  if (typeof window !== 'undefined') {
    const { isAuthenticated, requireAuth } = require('@/lib/auth');
    if (!isAuthenticated()) {
      requireAuth('/');
      return null;
    }
  }
  const [cameraTotal, setCameraTotal] = useState<number>(0);
  const [cameraOnline, setCameraOnline] = useState<number>(0);
  const [cameraOffline, setCameraOffline] = useState<number>(0);

  const wsRef = useRef<WebSocket | null>(null);
  const retryRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const token = window.localStorage.getItem('accessToken') || window.localStorage.getItem('jwtToken') || '';
    const base = 'wss://frowsily-hunterlike-eneida.ngrok-free.dev/ws/cctv/status/';
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
        console.error('WebSocket connection failed', e);
        scheduleReconnect();
        return;
      }

      wsRef.current.onopen = () => {
        console.debug('CCTV websocket connected');
        retryRef.current = 0;
      };

      wsRef.current.onmessage = (ev) => {
        try {
          const data = JSON.parse(ev.data);
          if (typeof data.total === 'number' && typeof data.online === 'number' && typeof data.offline === 'number') {
            setCameraTotal(data.total);
            setCameraOnline(data.online);
            setCameraOffline(data.offline);
          } else if (data.cameras) {
            const c = data.cameras;
            if (c && typeof c.total === 'number') setCameraTotal(c.total);
            if (c && typeof c.online === 'number') setCameraOnline(c.online);
            if (c && typeof c.offline === 'number') setCameraOffline(c.offline);
          } else if (Array.isArray(data)) {
            const total = data.length;
            const online = data.filter((d: any) => d.status === 'online' || d.is_online === true).length;
            setCameraTotal(total);
            setCameraOnline(online);
            setCameraOffline(total - online);
          } else if (data.stats) {
            const s = data.stats;
            if (s.total) setCameraTotal(Number(s.total));
            if (s.online) setCameraOnline(Number(s.online));
            if (s.offline) setCameraOffline(Number(s.offline));
          }
        } catch (err) {
          console.debug('Non-JSON websocket message', ev.data);
        }
      };

      wsRef.current.onclose = (ev) => {
        console.warn('CCTV websocket closed', ev.code, ev.reason);
        wsRef.current = null;
        if (!shouldClose) scheduleReconnect();
      };

      wsRef.current.onerror = (e) => {
        console.error('CCTV websocket error', e);
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-min">
        <StatsCard
          title="Cameras"
          subtitle="CCTV Surveillance"
          icon={
            <Video
              className="h-10 w-10 text-blue-500"
            />
          }
          status="Active"
          statusColor="bg-blue-500"
          total={cameraTotal}
          online={cameraOnline}
          offline={cameraOffline}
        />
        <StatsCard
          title="Lights"
          subtitle="Smart Lighting"
          icon={
            <Lightbulb
                className="h-10 w-10 text-yellow-500"
            />
          }
          status="Active"
          statusColor="bg-yellow-500"
          total={48}
          online={42}
          offline={6}
        />
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <EnergyUsageCard />
          <ElectricityHoursCard />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <DashboardHeader />
        <MotionAutomationCard />
        <QuickActions />
      </div>
    </div>
  );
}

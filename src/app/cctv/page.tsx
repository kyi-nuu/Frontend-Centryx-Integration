
"use client";

import { useEffect } from 'react';
import { requireAuth } from '@/lib/auth';

useEffect(() => { requireAuth('/'); }, []);

// ...existing code...
import { CctvHeader } from '@/components/cctv/cctv-header';
import { CameraCard } from '@/components/cctv/camera-card';
import { RecordingsView } from '@/components/cctv/recordings-view';
import { LiveMonitoringView } from '@/components/cctv/live-monitoring-view';
import { CameraInfoDialog } from '@/components/cctv/camera-info-dialog';
import { SingleCameraView } from '@/components/cctv/single-camera-view';

export type Camera = {
  name: string;
  location: string;
  brand: string;
  model: string;
  isRecording: boolean;
  status: 'online' | 'offline';
  imageUrl: string;
  linkedLights: {
    name: string;
    location: string;
    brightness: number;
    isOn: boolean;
  }[];
};

const camerasData: Camera[] = [
  { name: 'Main Entrance', location: 'Front Door', brand: 'Hikvision', model: 'DS-2CD2143G0-I', isRecording: true, status: 'online', imageUrl: 'https://picsum.photos/seed/cam1/600/400', linkedLights: [{ name: 'Entrance Light 1', location: 'Front Door', brightness: 80, isOn: true }, { name: 'Entrance Light 2', location: 'Front Door', brightness: 100, isOn: true }] },
  { name: 'Parking Lot A', location: 'East Wing', brand: 'Dahua', model: 'IPC-HDBW2831R-ZS', isRecording: true, status: 'online', imageUrl: 'https://picsum.photos/seed/cam2/600/400', linkedLights: [] },
  { name: 'Lobby Area', location: 'Ground Floor', brand: 'Axis', model: 'M3065-V', isRecording: false, status: 'offline', imageUrl: 'https://picsum.photos/seed/cam3/600/400', linkedLights: [] },
  { name: 'Hallway Section 3', location: 'Floor 2', brand: 'Bosch', model: 'Flexidome IP 5000', isRecording: true, status: 'online', imageUrl: 'https://picsum.photos/seed/cam4/600/400', linkedLights: [] },
  { name: 'Rooftop East', location: 'Building A', brand: 'Hikvision', model: 'DS-2CD2047G2-LU', isRecording: false, status: 'offline', imageUrl: 'https://picsum.photos/seed/cam5/600/400', linkedLights: [] },
  { name: 'Loading Bay', location: 'Service Area', brand: 'Dahua', model: 'IPC-HFW3849T1-AS-PV', isRecording: true, status: 'online', imageUrl: 'https://picsum.photos/seed/cam6/600/400', linkedLights: [] },
  { name: 'Server Room', location: 'Basement', brand: 'Axis', model: 'M3065-V', isRecording: true, status: 'online', imageUrl: 'https://picsum.photos/seed/cam7/600/400', linkedLights: [] },
  { name: 'Staff Canteen', location: 'Floor 1', brand: 'Hikvision', model: 'DS-2CD2143G2-I', isRecording: false, status: 'offline', imageUrl: 'https://picsum.photos/seed/cam8/600/400', linkedLights: [] },
  { name: 'Meeting Room 5', location: 'Floor 3', brand: 'Dahua', model: 'IPC-HDBW2831R-ZS', isRecording: true, status: 'online', imageUrl: 'https://picsum.photos/seed/cam9/600/400', linkedLights: [] },
  { name: 'West Corridor', location: 'Floor 2', brand: 'Axis', model: 'M3065-V', isRecording: true, status: 'online', imageUrl: 'https://picsum.photos/seed/cam10/600/400', linkedLights: [] },
  { name: 'Garage Level 2', location: 'Parking Structure', brand: 'Bosch', model: 'Flexidome IP 5000', isRecording: true, status: 'online', imageUrl: 'https://picsum.photos/seed/cam11/600/400', linkedLights: [] },
  { name: 'Library', location: 'Community Hall', brand: 'Hikvision', model: 'DS-2CD2047G2-LU', isRecording: false, status: 'offline', imageUrl: 'https://picsum.photos/seed/cam12/600/400', linkedLights: [] },
  { name: 'Main Auditorium', location: 'Main Hall', brand: 'Dahua', model: 'IPC-HFW3849T1-AS-PV', isRecording: true, status: 'online', imageUrl: 'https://picsum.photos/seed/cam13/600/400', linkedLights: [] },
  { name: 'Gymnasium', location: 'Sports Complex', brand: 'Hikvision', model: 'DS-2CD2143G2-I', isRecording: true, status: 'online', imageUrl: 'https://picsum.photos/seed/cam14/600/400', linkedLights: [] },
  { name: 'IT Department', location: 'Floor 4', brand: 'Dahua', model: 'IPC-HDBW2831R-ZS', isRecording: false, status: 'offline', imageUrl: 'https://picsum.photos/seed/cam15/600/400', linkedLights: [] },
  { name: 'Reception', location: 'Ground Floor', brand: 'Axis', model: 'M3065-V', isRecording: true, status: 'online', imageUrl: 'https://picsum.photos/seed/cam16/600/400', linkedLights: [] },
  { name: 'Archive Room', location: 'Basement', brand: 'Bosch', model: 'Flexidome IP 5000', isRecording: true, status: 'online', imageUrl: 'https://picsum.photos/seed/cam17/600/400', linkedLights: [] },
  { name: 'Data Center', location: 'Floor 5', brand: 'Hikvision', model: 'DS-2CD2047G2-LU', isRecording: true, status: 'online', imageUrl: 'https://picsum.photos/seed/cam18/600/400', linkedLights: [] },
  { name: 'Back Entrance', location: 'Rear Side', brand: 'Dahua', model: 'IPC-HFW3849T1-AS-PV', isRecording: false, status: 'offline', imageUrl: 'https://picsum.photos/seed/cam19/600/400', linkedLights: [] },
  { name: 'Finance Office', location: 'Floor 4', brand: 'Axis', model: 'M3065-V', isRecording: true, status: 'online', imageUrl: 'https://picsum.photos/seed/cam20/600/400', linkedLights: [] },
];

export type CctvView = 'grid' | 'recordings' | 'live-monitoring';
export type FilterStatus = 'all' | 'online' | 'offline';


export default function CctvPage() {
  const [view, setView] = useState<CctvView>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
  const [expandedCamera, setExpandedCamera] = useState<Camera | null>(null);


  const handleSetView = (newView: CctvView) => {
    // If we are in live-monitoring, clicking the button again should take us back to the grid.
    if (view === 'live-monitoring' && newView === 'live-monitoring') {
        setView('grid');
    } else {
        setView(newView);
    }
  }

  const onlineCameras = camerasData.filter(cam => cam.status === 'online');
  
  const filteredCameras = useMemo(() => {
    return camerasData
      .filter(camera => {
        if (filterStatus === 'all') return true;
        return camera.status === filterStatus;
      })
      .filter(camera => 
        camera.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        camera.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [searchTerm, filterStatus]);

  const onlineCount = useMemo(() => camerasData.filter(cam => cam.status === 'online').length, []);
  const offlineCount = useMemo(() => camerasData.filter(cam => cam.status === 'offline').length, []);

  if (view === 'live-monitoring') {
    return <LiveMonitoringView cameras={onlineCameras} onClose={() => setView('grid')} />;
  }

  if (expandedCamera) {
    return <SingleCameraView camera={expandedCamera} onClose={() => setExpandedCamera(null)} />;
  }

  return (
    <div className="flex flex-col h-full">
       {selectedCamera && (
        <CameraInfoDialog
          camera={selectedCamera}
          open={!!selectedCamera}
          onOpenChange={(isOpen) => !isOpen && setSelectedCamera(null)}
        />
      )}
      <div className="sticky top-0 z-10 bg-transparent">
        <CctvHeader 
          activeView={view} 
          onSetView={handleSetView}
          onSearchChange={setSearchTerm}
          onFilterChange={setFilterStatus}
          onlineCount={onlineCount}
          offlineCount={offlineCount}
        />
      </div>
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        {view === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCameras.map((camera, index) => (
              <CameraCard
                key={index}
                camera={camera}
                onInfoClick={() => setSelectedCamera(camera)}
                onExpandClick={() => setExpandedCamera(camera)}
              />
            ))}
          </div>
        ) : (
          <RecordingsView />
        )}
      </div>
    </div>
  );
}

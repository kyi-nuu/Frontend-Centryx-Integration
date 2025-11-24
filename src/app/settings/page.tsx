
"use client";

import { useEffect } from 'react';
import { requireAuth } from '@/lib/auth';

useEffect(() => { requireAuth('/'); }, []);

// ...existing code...
import { AddDeviceCard, Device } from '@/components/settings/add-device-card';
import { DeviceList } from '@/components/settings/device-list';
import { SettingsHeader } from '@/components/settings/settings-header';

const initialCamerasData: Device[] = [
  { id: 'cam1', icon: 'cctv', name: 'Main Entrance', description: 'Front Door', details: 'Hikvision DS-2CD2143G2-I' },
  { id: 'cam2', icon: 'cctv', name: 'Parking Lot A', description: 'East Wing', details: 'Dahua IPC-HDBW2831R-ZS' },
  { id: 'cam3', icon: 'cctv', name: 'Lobby Area', description: 'Ground Floor', details: 'Axis M3065-V' },
  { id: 'cam4', icon: 'cctv', name: 'Hallway Section 3', description: 'Floor 2', details: 'Bosch Flexidome IP 5000' },
  { id: 'cam5', icon: 'cctv', name: 'Rooftop East', description: 'Building A', details: 'Hikvision DS-2CD2047G2-LU' },
  { id: 'cam6', icon: 'cctv', name: 'Loading Bay', description: 'Service Area', details: 'Dahua IPC-HFW3849T1-AS-PV' },
  { id: 'cam7', icon: 'cctv', name: 'Server Room', description: 'Basement', details: 'Axis M3065-V' },
  { id: 'cam8', icon: 'cctv', name: 'Staff Canteen', description: 'Floor 1', details: 'Hikvision DS-2CD2143G2-I' },
  { id: 'cam9', icon: 'cctv', name: 'Meeting Room 5', description: 'Floor 3', details: 'Dahua IPC-HDBW2831R-ZS' },
  { id: 'cam10', icon: 'cctv', name: 'West Corridor', description: 'Floor 2', details: 'Axis M3065-V' },
  { id: 'cam11', icon: 'cctv', name: 'Garage Level 2', description: 'Parking Structure', details: 'Bosch Flexidome IP 5000' },
  { id: 'cam12', icon: 'cctv', name: 'Library', description: 'Community Hall', details: 'Hikvision DS-2CD2047G2-LU' },
  { id: 'cam13', icon: 'cctv', name: 'Main Auditorium', description: 'Main Hall', details: 'Dahua IPC-HFW3849T1-AS-PV' },
  { id: 'cam14', icon: 'cctv', name: 'Gymnasium', description: 'Sports Complex', details: 'Hikvision DS-2CD2143G2-I' },
  { id: 'cam15', icon: 'cctv', name: 'IT Department', description: 'Floor 4', details: 'Dahua IPC-HDBW2831R-ZS' },
  { id: 'cam16', icon: 'cctv', name: 'Reception', description: 'Ground Floor', details: 'Axis M3065-V' },
  { id: 'cam17', icon: 'cctv', name: 'Archive Room', description: 'Basement', details: 'Bosch Flexidome IP 5000' },
  { id: 'cam18', icon: 'cctv', name: 'Data Center', description: 'Floor 5', details: 'Hikvision DS-2CD2047G2-LU' },
  { id: 'cam19', icon: 'cctv', name: 'Back Entrance', description: 'Rear Side', details: 'Dahua IPC-HFW3849T1-AS-PV' },
  { id: 'cam20', icon: 'cctv', name: 'Finance Office', description: 'Floor 4', details: 'Axis M3065-V' },
];

const initialLightsData: Device[] = [
  { id: 'light1', icon: 'light', name: 'Living Room', description: 'Room 1', details: 'Philips Hue White Ambiance' },
  { id: 'light2', icon: 'light', name: 'Kitchen', description: 'Room 2', details: 'LIFX A19' },
  { id: 'light3', icon: 'light', name: 'Bedroom 1', description: 'Room 3', details: 'Wyze Bulb Color' },
  { id: 'light4', icon: 'light', name: 'Bedroom 2', description: 'Room 4', details: 'Sengled Element Classic' },
  { id: 'light5', icon: 'light', name: 'Hallway', description: 'Room 5', details: 'Philips Hue White Ambiance' },
  { id: 'light6', icon: 'light', name: 'Bathroom', description: 'Room 6', details: 'LIFX A19' },
  { id: 'light7', icon: 'light', name: 'Main Entrance', description: 'Room 7', details: 'Wyze Bulb Color' },
  { id: 'light8', icon: 'light', name: 'Parking Lot', description: 'CCTV 8', details: 'Sengled Element Classic' },
  { id: 'light9', icon: 'light', name: 'Office', description: 'Room 9', details: 'Philips Hue White Ambiance' },
  { id: 'light10', icon: 'light', name: 'Dining Room', description: 'Room 10', details: 'LIFX A19' },
  { id: 'light11', icon: 'light', name: 'Garage', description: 'CCTV 11', details: 'Wyze Bulb Color' },
  { id: 'light12', icon: 'light', name: 'Basement', description: 'Room 12', details: 'Sengled Element Classic' },
  { id: 'light13', icon: 'light', name: 'Guest Room', description: 'Room 13', details: 'Philips Hue White Ambiance' },
  { id: 'light14', icon: 'light', name: 'Patio', description: 'CCTV 14', details: 'LIFX A19' },
  { id: 'light15', icon: 'light', name: 'Study', description: 'Room 15', details: 'Wyze Bulb Color' },
  { id: 'light16', icon: 'light', name: 'Laundry Room', description: 'Room 16', details: 'Sengled Element Classic' },
  { id: 'light17', icon: 'light', name: 'Stairs', description: 'Room 17', details: 'Philips Hue White Ambiance' },
  { id: 'light18', icon: 'light', name: 'Backyard', description: 'CCTV 18', details: 'LIFX A19' },
  { id: 'light19', icon: 'light', name: 'Balcony', description: 'Room 19', details: 'Wyze Bulb Color' },
  { id: 'light20', icon: 'light', name: 'Rooftop', description: 'CCTV 20', details: 'Sengled Element Classic' },
];

export default function SettingsPage() {
  const [cameras, setCameras] = useState<Device[]>(initialCamerasData);
  const [lights, setLights] = useState<Device[]>(initialLightsData);

  const handleAddDevice = (device: Device) => {
    if (device.icon === 'cctv') {
      setCameras(prev => [device, ...prev]);
    } else {
      setLights(prev => [device, ...prev]);
    }
  };

  const handleDeleteDevice = (id: string, type: 'cctv' | 'light') => {
    if (type === 'cctv') {
      setCameras(prev => prev.filter(device => device.id !== id));
    } else {
      setLights(prev => prev.filter(device => device.id !== id));
    }
  };


  return (
    <div className="flex flex-col h-full">
      <SettingsHeader />
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <AddDeviceCard onAddDevice={handleAddDevice} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DeviceList
            title="CCTV"
            searchPlaceholder="Search camera by name"
            items={cameras}
            onDelete={(id) => handleDeleteDevice(id, 'cctv')}
          />
          <DeviceList
            title="Lights"
            searchPlaceholder="Search light by name"
            items={lights}
            onDelete={(id) => handleDeleteDevice(id, 'light')}
          />
        </div>
      </div>
    </div>
  );
}

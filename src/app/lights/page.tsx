
"use client";

import { useEffect } from 'react';
import { requireAuth } from '@/lib/auth';

useEffect(() => { requireAuth('/'); }, []);

// ...existing code...
import { LightsHeader } from "@/components/lights/lights-header";
import { LightCard } from "@/components/lights/light-card";

type Light = {
  id: number;
  name: string;
  room: string;
  isOn: boolean;
  brightness?: number;
};

type Mode = 'day' | 'night' | 'eco' | null;

const initialLightsData: Light[] = [
  { id: 1, name: "Living Room", room: "Room 1", isOn: true, brightness: 80 },
  { id: 2, name: "Kitchen", room: "Room 2", isOn: true, brightness: 60 },
  { id: 3, name: "Bedroom 1", room: "Room 3", isOn: false },
  { id: 4, name: "Bedroom 2", room: "Room 4", isOn: false },
  { id: 5, name: "Hallway", room: "Room 5", isOn: true, brightness: 70 },
  { id: 6, name: "Bathroom", room: "Room 6", isOn: false },
  { id: 7, name: "Main Entrance", room: "Room 7", isOn: true, brightness: 90 },
  { id: 8, name: "Parking Lot", room: "CCTV 8", isOn: true, brightness: 100 },
  { id: 9, name: "Office", room: "Room 9", isOn: false },
  { id: 10, name: "Dining Room", room: "Room 10", isOn: true, brightness: 75 },
  { id: 11, name: "Garage", room: "CCTV 11", isOn: false },
  { id: 12, name: "Basement", room: "Room 12", isOn: true, brightness: 50 },
  { id: 13, name: "Guest Room", room: "Room 13", isOn: false },
  { id: 14, name: "Patio", room: "CCTV 14", isOn: true, brightness: 85 },
  { id: 15, name: "Study", room: "Room 15", isOn: true, brightness: 65 },
  { id: 16, name: "Laundry Room", room: "Room 16", isOn: false },
  { id: 17, name: "Stairs", room: "Room 17", isOn: true, brightness: 55 },
  { id: 18, name: "Backyard", room: "CCTV 18", isOn: false },
  { id: 19, name: "Balcony", room: "Room 19", isOn: true, brightness: 45 },
  { id: 20, name: "Rooftop", room: "CCTV 20", isOn: false },
];

export default function LightsPage() {
  const [lights, setLights] = useState<Light[]>(initialLightsData);
  const [filter, setFilter] = useState<'all' | 'on' | 'off'>('all');
  const [activeMode, setActiveMode] = useState<Mode>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleToggle = (id: number, isOn: boolean) => {
    setLights(prevLights =>
      prevLights.map(light =>
        light.id === id ? { ...light, isOn, brightness: isOn ? light.brightness || 50 : 0 } : light
      )
    );
  };

  const handleBrightnessChange = (id: number, brightness: number) => {
    setLights(prevLights =>
      prevLights.map(light =>
        light.id === id ? { ...light, brightness } : light
      )
    );
  };

  const handleToggleAll = (isOn: boolean) => {
    setActiveMode(null);
    setLights(prevLights =>
      prevLights.map(light => ({ ...light, isOn, brightness: isOn ? light.brightness || 50 : 0 }))
    );
  };

  const handleModeChange = (mode: Mode) => {
    const newActiveMode = activeMode === mode ? null : mode;
    setActiveMode(newActiveMode);

    if (newActiveMode === 'day') {
      setLights(prev => prev.map(l => l.isOn ? {...l, brightness: 80} : l));
    } else if (newActiveMode === 'night') {
      setLights(prev => prev.map(l => l.isOn ? {...l, brightness: 30} : l));
    } else if (newActiveMode === 'eco') {
       setLights(prev => prev.map(l => l.isOn ? {...l, brightness: 50} : l));
    }
  };

  const filteredLights = useMemo(() => {
    return lights
      .filter(light => {
        if (filter === 'all') return true;
        return filter === 'on' ? light.isOn : !light.isOn;
      })
      .filter(light => 
        light.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        light.room.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [lights, filter, searchTerm]);

  const onCount = useMemo(() => lights.filter(l => l.isOn).length, [lights]);
  const offCount = useMemo(() => lights.filter(l => !l.isOn).length, [lights]);

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 z-10 bg-transparent">
        <LightsHeader
          onFilterChange={setFilter}
          onModeChange={handleModeChange}
          activeMode={activeMode}
          onToggleAll={handleToggleAll}
          onCount={onCount}
          offCount={offCount}
          onSearchChange={setSearchTerm}
        />
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-4 pt-2 sm:px-6 sm:pb-6 sm:pt-3 lg:px-8 lg:pb-8 lg:pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredLights.map((light) => (
            <LightCard
              key={light.id}
              name={light.name}
              room={light.room}
              isOn={light.isOn}
              brightness={light.brightness}
              onToggle={(isOn) => handleToggle(light.id, isOn)}
              onBrightnessChange={(brightness) => handleBrightnessChange(light.id, brightness)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

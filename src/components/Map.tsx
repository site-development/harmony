"use client";

import { useEffect, useRef } from 'react';

interface MapProps {
  center: [number, number]; // [latitude, longitude]
  zoom: number;
  markers?: {
    position: [number, number];
    title: string;
    popup?: string;
  }[];
}

export default function Map({ center, zoom, markers = [] }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return;

    // Store a reference to the current mapRef value for cleanup
    const currentMapElement = mapRef.current;

    // Create a script element to load the Leaflet library dynamically
    const loadMap = async () => {
      // Mock map implementation - in a real project, you would use Leaflet, Google Maps, or another library
      const mapElement = currentMapElement;

      // Add a basic map placeholder
      if (mapElement) {
        mapElement.innerHTML = `
          <div style="position: relative; width: 100%; height: 100%; background-color: #f0f0f0; overflow: hidden; border-radius: 0.375rem;">
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: repeating-linear-gradient(45deg, #efefef, #efefef 10px, #e8e8e8 10px, #e8e8e8 20px);"></div>
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); padding: 1rem; background: white; border-radius: 0.5rem; box-shadow: 0 2px 10px rgba(0,0,0,0.1); text-align: center;">
              <h3 style="font-weight: 600; margin-bottom: 0.5rem;">${markers[0]?.title || 'Map Location'}</h3>
              <p style="font-size: 0.875rem; color: #666;">
                ${center[0].toFixed(4)}, ${center[1].toFixed(4)}
              </p>
              <p style="font-size: 0.75rem; color: #999; margin-top: 0.5rem;">
                Interactive map would appear here in a production environment
              </p>
            </div>
            <!-- Marker dot -->
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 20px; height: 20px; background-color: #ef4444; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.2);"></div>
          </div>
        `;
      }
    };

    loadMap();

    // Cleanup function
    return () => {
      if (currentMapElement) {
        currentMapElement.innerHTML = '';
      }
    };
  }, [center, zoom, markers]);

  return (
    <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
  );
}

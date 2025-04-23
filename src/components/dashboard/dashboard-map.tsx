import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const INITIAL_COOR: [number, number] = [42.741, 27.2616];
const INITIAL_ZOOM = 10.12;

const DashboardMap = () => {
  const [center, setCenter] = useState<[number, number]>(INITIAL_COOR);
  const [zoom, setZoom] = useState(INITIAL_ZOOM);

  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibWlyaWFoZXJlIiwiYSI6ImNtOXJ5NzNubTAxZjIyam9sNHRoNnV3N3oifQ.m_bhl7hhwE51eBntcFeHxw";
    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: center,
        zoom: zoom,
      });
    }

    return () => {
      mapRef.current?.remove();
    };
  });

  return (
    <main className="w-full min-h-screen flex justify-start items-start mt-1  p-2.5">
      {/* <div
        id="map-container"
        className="w-full h-full bg-white rounded-lg shadow-md"
        ref={mapContainerRef}
      ></div> */}
    </main>
  );
};

export default DashboardMap;

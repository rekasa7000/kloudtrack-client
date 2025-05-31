import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

interface LocationInfo {
  place_name: string;
  text: string;
  country: string;
  region: string;
  district: string;
  place: string;
  locality: string;
  neighborhood: string;
  postcode: string;
}

export const useMapboxLocator = () => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainer = useRef<HTMLDivElement>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  const [lngLat, setLngLat] = useState<{ lng: number; lat: number } | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const mapboxStyle = "mapbox://styles/mapbox/satellite-streets-v11";

  const getLocationInfo = async (lng: number, lat: number) => {
    setLoadingLocation(true);
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${import.meta.env.VITE_MAPBOX_TOKEN}&types=country,region,district,place,locality,neighborhood,address`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch location data");
      }

      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const feature = data.features[0];
        const context = feature.context || [];

        const locationData: LocationInfo = {
          place_name: feature.place_name,
          text: feature.text,
          country: context.find((c: any) => c.id.startsWith("country"))?.text || "",
          region: context.find((c: any) => c.id.startsWith("region"))?.text || "",
          district: context.find((c: any) => c.id.startsWith("district"))?.text || "",
          place: context.find((c: any) => c.id.startsWith("place"))?.text || "",
          locality: context.find((c: any) => c.id.startsWith("locality"))?.text || "",
          neighborhood: context.find((c: any) => c.id.startsWith("neighborhood"))?.text || "",
          postcode: context.find((c: any) => c.id.startsWith("postcode"))?.text || "",
        };

        setLocationInfo(locationData);
      } else {
        setLocationInfo({
          place_name: "Location not found",
          text: "Unknown location",
          country: "",
          region: "",
          district: "",
          place: "",
          locality: "",
          neighborhood: "",
          postcode: "",
        });
      }
    } catch (error) {
      console.error("Error fetching location info:", error);
      setLocationInfo({
        place_name: "Error fetching location",
        text: "Could not retrieve location data",
        country: "",
        region: "",
        district: "",
        place: "",
        locality: "",
        neighborhood: "",
        postcode: "",
      });
    } finally {
      setLoadingLocation(false);
    }
  };

  const initializeMap = () => {
    if (!mapContainer.current || mapRef.current) return;

    try {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: mapboxStyle,
        center: [120.4818, 14.6417],
        zoom: 10,
        maxZoom: 15,
        minZoom: 8,
        accessToken: import.meta.env.VITE_MAPBOX_TOKEN,
        maxBounds: [117.27427453, 5.68100332277, 126.557423944, 18.5552273625],
      });

      mapRef.current = map;

      map.on("load", () => {
        console.info("Map loaded successfully");
        setMapLoaded(true);
        map.resize();
      });

      map.on("error", (e) => {
        console.error("Map error:", e);
      });

      map.addControl(new mapboxgl.NavigationControl(), "bottom-left");
      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
          showUserHeading: true,
        }),
        "bottom-left"
      );

      map.on("click", async (e) => {
        const coordinates = {
          lng: e.lngLat.lng,
          lat: e.lngLat.lat,
        };
        setLngLat(coordinates);

        if (markerRef.current) {
          markerRef.current.remove();
        }

        const newMarker = new mapboxgl.Marker({
          color: "#3b82f6",
          draggable: false,
        })
          .setLngLat([coordinates.lng, coordinates.lat])
          .addTo(map);

        markerRef.current = newMarker;

        await getLocationInfo(coordinates.lng, coordinates.lat);
      });
    } catch (error) {
      console.error("Error initializing map:", error);
    }
  };

  const resetMap = () => {
    if (markerRef.current) {
      markerRef.current.remove();
      markerRef.current = null;
    }
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }
    setLngLat(null);
    setLocationInfo(null);
    setLoadingLocation(false);
    setMapLoaded(false);
  };

  useEffect(() => {
    const timer1 = setTimeout(() => {
      initializeMap();
    }, 100);

    const timer2 = setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.resize();
      }
    }, 300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [mapboxStyle]);

  return {
    mapContainer,
    mapRef,
    lngLat,
    mapLoaded,
    locationInfo,
    loadingLocation,
    resetMap,
  };
};

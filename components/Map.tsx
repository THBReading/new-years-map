"use client";

import { useEffect, useMemo, useState } from "react";
import Map, { Source, Layer, Marker } from "react-map-gl/maplibre";
import maplibregl from "maplibre-gl";
import CityMarker from "./CityMarker";

const MAP_STYLE = "https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json";
//   "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

export default function CapitalsMap() {
  const [geojson, setGeojson] = useState<GeoJSON.FeatureCollection<GeoJSON.Point, { city: string; timezone: string }> | null>(null);

  useEffect(() => {
    fetch("/capitals_with_timezone.geojson")
      .then((res) => res.json())
      .then(setGeojson);
  }, []);

  if (!geojson) return null;

  return (
    <Map
      mapLib={maplibregl}
      mapStyle={MAP_STYLE}
      initialViewState={{ longitude: 0, latitude: 20, zoom: 1.5 }}
      style={{ width: "100%", height: "100vh" }}
      projection={"globe"}
    >
      {/* Base dots (fast) */}
      {/* <Source id="capitals" type="geojson" data={geojson}>
         <Layer
          id="capitals-circle"
          type="circle"
          paint={{
            "circle-radius": 2,
            "circle-color": "#4f4f4fff",
            "circle-stroke-width": 1,
            "circle-stroke-color": "#ffffff",
          }}
        /> 
      </Source> */}
        {geojson.features.map((f) => {
          const [lng, lat] = f.geometry.coordinates;
          return (
            <Marker
              key={f.id}
              longitude={lng}
              latitude={lat}
            >
              <CityMarker feature={f} /> 
            </Marker>
          );
        })}
    </Map>
  );
}

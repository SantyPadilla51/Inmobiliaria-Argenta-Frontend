import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 13);
  }, [lat, lng, map]);
  return null;
}

export const MapByAddress = ({ address }: { address: string }) => {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null,
  );

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const response = await fetch(
          `/nominatim/search?format=json&q=${encodeURIComponent(address)}&viewbox=-59.0,-35.0,-57.5,-34.0&bounded=1`,
          {
            headers: {
              "User-Agent": "InmobiliariaArgentaApp/1.0",
            },
          },
        );

        const data = await response.json();

        if (data && data.length > 0) {
          setCoords({
            lat: parseFloat(data[0].lat),
            lon: parseFloat(data[0].lon),
          });
        } else {
          console.warn("No se encontraron coordenadas para:", address);
        }
      } catch (error) {
        console.error("Error en Geocoding:", error);
      }
    };

    if (address && address.length > 5) fetchCoords();
  }, [address]);

  if (!coords) return <p>Cargando mapa...</p>;

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <MapContainer
        center={[coords.lat, coords.lon]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[coords.lat, coords.lon]} />
        <RecenterMap lat={coords.lat} lng={coords.lon} />
      </MapContainer>
    </div>
  );
};

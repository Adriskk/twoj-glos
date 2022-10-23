import React, { FC, useMemo } from "react";
import {
  GoogleMap as GM,
  useLoadScript,
  MarkerF,
} from "@react-google-maps/api";
import Loader from "../Loader/Loader";

interface GoogleMapProps {
  zoom: number;
  coords: { lat: number; lng: number };
  marker: false | { lat: number; lng: number };
}

const GoogleMap: FC<GoogleMapProps> = ({ zoom, coords, marker }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env?.REACT_APP_GOOGLE_MAPS_API_KEY || "",
  });

  const center = useMemo(() => coords, [coords]);
  const markerCoords = useMemo(() => marker, [marker]);

  // * Default map options.
  const mapOptions = {
    clickableIcons: false,
    disableDefaultUI: true,
  };

  if (!isLoaded) return <Loader size="small" />;

  return (
    <GM
      zoom={zoom}
      center={center}
      mapContainerClassName="google-map-cls"
      options={mapOptions}
      onCenterChanged={() => {}}
    >
      {markerCoords !== false && <MarkerF position={markerCoords} />}
    </GM>
  );
};

export default GoogleMap;

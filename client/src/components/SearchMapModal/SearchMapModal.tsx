import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { useDebounce } from "use-debounce";

// * Interfaces.
import GeocodingInterface from "../../interfaces/Geocoding.interface";
import ErrorInterface from "../../interfaces/Error.interface";

// * Components.
import GoogleMap from "../GoogleMap/GoogleMap";
import Popup from "../Popup/Popup";
import Button from "../Button/Button";

// * Config.
import { CONSTANTS, ENDPOINTS } from "../../config";

interface SearchMapModalProps {
  coords: { lat: number; lng: number };
  setCoords: React.Dispatch<React.SetStateAction<{ lat: number; lng: number }>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLocalization: React.Dispatch<React.SetStateAction<string>>;
}

const SearchMapModal: FC<SearchMapModalProps> = ({
  coords,
  setCoords,
  setIsOpen,
  setLocalization,
}) => {
  const [error, setError] = useState<ErrorInterface>({
    error: false,
    message: "",
  });

  const [address, setAddress] = useState<string>(
    "Warszawa, Aleje Jerozolimskie"
  );

  const DEBOUNCE_DELAY = 1000;
  const [debounceAddress] = useDebounce(address, DEBOUNCE_DELAY);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  useEffect(() => {
    if (debounceAddress === "") return;

    // * Get geocoding data using Geocoding API ~ Google Maps.
    const fetchData = async (): Promise<GeocodingInterface> => {
      const { data } = await axios.get<GeocodingInterface>(
        ENDPOINTS?.GET_LAT_LNG_GM.replace(":address", debounceAddress).replace(
          ":key",
          process.env?.REACT_APP_GOOGLE_MAPS_API_KEY || ""
        )
      );

      return data;
    };

    fetchData()
      .then((data: GeocodingInterface) => {
        if (data?.status === "OK") {
          setCoords(data?.results[0]?.geometry?.location);
          setLocalization(data?.results[0]?.formatted_address);
        }
      })
      .catch(({ response }) => {
        setError({
          error: true,
          message: "Wystąpił błąd podczas pobierania adresu",
        });
      });
  }, [debounceAddress]);

  const comeback = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="overlay"></div>
      <div className="search-map-modal f-column y-start x-start">
        {error.error && (
          <div className="flex y-center x-center" style={{ width: "100%" }}>
            <Popup title="Wystąpił błąd" message={error.message} />
          </div>
        )}

        <div className="map-content f-column y-center x-start">
          <span className="modal-header">
            Zaznacz miejsce powstania projektu
          </span>
          <div className="wrapper f-column y-center x-center">
            <input
              className="search-input"
              placeholder="Wpisz adres lokalizacji"
              value={address}
              onChange={onChange}
            />
            <Button text="Wybierz" type="button" callback={comeback} />
          </div>
        </div>

        <div className="map-wrapper flex y-center x-center">
          <GoogleMap
            zoom={CONSTANTS?.MODAL_GOOGLE_MAPS_ZOOM}
            coords={coords}
            marker={coords}
          />
        </div>
      </div>
    </>
  );
};

export default SearchMapModal;

export default interface GeocodingInterface {
  results: [
    {
      address_components: [
        {
          long_name: string;
          short_name: string;
          types: string[];
        }
      ];
      formatted_address: string;
      geometry: {
        bounds: {
          northeast: {
            lat: number;
            lng: number;
          };

          southwest: {
            lat: number;
            lng: number;
          };
        };
        location: {
          lat: number;
          lng: number;
        };
        location_type: string;
        viewport: {
          northeast: {
            lat: 49.0024442;
            lng: -116.91558;
          };
          southwest: {
            lat: 45.543541;
            lng: -124.8489739;
          };
        };
      };
      place_id: string;
      types: string[];
    }
  ];
  status: "OK" | "ZERO_RESULTS";
}

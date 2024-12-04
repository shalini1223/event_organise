import React, { useState } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";

const LocationField = ({ onLocationChange }) => {
  const [location, setLocation] = useState({
    address: "",
    city: "",
    province: "",
    zipcode: "",
  });

  const handlePlaceSelect = (autocomplete) => {
    const place = autocomplete.getPlace();
    const components = place.address_components;

    // Extract address details
    const addressDetails = {
      address: place.formatted_address,
      city: components.find((c) => c.types.includes("locality"))?.long_name || "",
      province: components.find((c) => c.types.includes("administrative_area_level_1"))?.long_name || "",
      zipcode: components.find((c) => c.types.includes("postal_code"))?.long_name || "",
    };

    setLocation(addressDetails);
    onLocationChange(addressDetails); // Pass data to parent
  };
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} libraries={["places"]}>
      <Autocomplete
        onLoad={(autocomplete) => (window.autocomplete = autocomplete)}
        onPlaceChanged={() => handlePlaceSelect(window.autocomplete)}
      >
        <input type="text" placeholder="Enter a location" style={{ padding: "10px", width: "100%" }} />
      </Autocomplete>
    </LoadScript>
  );
};

export default LocationField;

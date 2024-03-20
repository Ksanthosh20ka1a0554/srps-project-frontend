import React from "react";
import "./CityOptions.css";

const CityOptions = ({ eachCity }) => {
  const { _id, city } = eachCity;

  return (
    <option className="home-city-option" value={_id}>
      {city}
    </option>
  );
};

export default CityOptions;

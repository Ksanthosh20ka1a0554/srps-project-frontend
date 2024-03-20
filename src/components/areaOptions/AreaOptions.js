import React from "react";
import "./AreaOptions.css";

const AreaOptions = ({ eachArea }) => {
  const { _id, areaName } = eachArea;

  return (
    <option className="home-city-option" value={_id}>
      {areaName}
    </option>
  );
};

export default AreaOptions;

import React, { useState }  from "react";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";
import geoUrl from "./features";
// const geoUrl ="https://raw.githubusercontent.com/deldersveld/topojson/master/continents/asia.json";

const markers = [
  { markerOffset: -15, name: "Philippines", coordinates: [121.774017, 12.879721] },
  { markerOffset: -15, name: "Singapore", coordinates: [103.819836, 1.352083] },
  { markerOffset: -10, name: "Malaysia", coordinates: [101.975766, 4.210484 ] },
  { markerOffset: -10, name: "Thailand", coordinates: [100.992541,15.870032] },
  { markerOffset: -10, name: "Indonesia", coordinates: [ 113.921327, -0.789275] },
  { markerOffset: -10, name: "Cambodia", coordinates: [ 104.990963, 12.565679] },
  { markerOffset: -10, name: "Brunei", coordinates: [ 114.727669, 4.535277] },
  { markerOffset: -10, name: "Myanmar", coordinates: [ 95.956223, 21.913965] },
  { markerOffset: -10, name: "Vietnam", coordinates: [ 108.277199, 14.058324] },
  // { markerOffset: -10, name: "Timor Leste", coordinates: [ 125.727539, -8.874217] },
  { markerOffset: -10, name: "Laos", coordinates: [ 102.495496, 19.85627] },
];

const rounded = (num) => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};

const MapChart = () => {

  const [tooltipContent, setTooltipContent] = useState("");
  return (
    <ComposableMap
      style={{maxHeight:"550", minWidth:"100%", textAlign:"center", padding: 0, fontSize:"18px", fontWeight:"bold"}}
      projection="geoAzimuthalEqualArea"
      projectionConfig={{ rotate: [-120, -10, 0], scale: 800 }}
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              onMouseEnter={() => {
                const { NAME, POP_EST } = geo.properties;
                setTooltipContent(`${NAME} — ${rounded(POP_EST)}`);
              }}
              onMouseLeave={() => {
                setTooltipContent("");
              }}
              style={{
                default: {
                  fill: "#D6D6DA",
                  outline: "none"
                },
                hover: {
                  fill: "#0000cc",
                  outline: "none"
                },
                pressed: {
                  fill: "#0000e6",
                  outline: "none"
                }
              }}
            />
          ))
        }
      </Geographies>
      {markers.map(({ name, coordinates, markerOffset }) => (
        <Marker key={name} coordinates={coordinates}>
          <circle r={5} fill="#003cb3" stroke="#fff" strokeWidth={2} />
          <text
            textAnchor="middle"
            y={markerOffset}
            style={{ fontFamily: "system-ui", fill: "#0044cc" }}
          >
            {name}
          </text>
        </Marker>
      ))}
    </ComposableMap>
  );
};

export default MapChart;
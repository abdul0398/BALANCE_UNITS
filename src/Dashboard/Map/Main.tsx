'use client'
import "maplibre-gl/dist/maplibre-gl.css";
import * as React from "react";
import Map, {
  Marker,
  ScaleControl,
} from "react-map-gl/maplibre";
import { GoDotFill } from "react-icons/go";
import { MyContext } from "@/context/context";
import { projects } from "@/data/data"
import { districtRelation, segmentRelation } from "@/data/relations";
import { projectRelation } from "@/data/projectListingRelation";

import { coordinate } from "@/data/coordinate";

export default function MapComponent() {
  const { selectedProjects, selectedDistricts, selectedType } = React.useContext(MyContext);

  let filteredProjects = projects;
  if (selectedDistricts.length > 0) {
    filteredProjects = projects.filter((project) => {
      return selectedDistricts.some((district) => {
        console.log(district, project);
        return districtRelation[district].includes(project);
      });
    });
  }


  if (selectedType !== "ALL") {
    filteredProjects = filteredProjects.filter((project) => {
      return segmentRelation[selectedType].projects.includes(project);
    });
  }

  filteredProjects = filteredProjects.filter((project) => {
    const isAvailable = projectRelation[project][projectRelation[project].length - 1].unitsAvail - projectRelation[project][projectRelation[project].length - 1].soldToDate != 0;

    return isAvailable;
  })





  return (
    <Map
      initialViewState={{
        latitude: 1.31399286264569,
        longitude: 103.837714613091,
        zoom: 10,
      }}
      style={{ borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}
      maxBounds={[103.596, 1.1443, 104.1, 1.4835]}
      mapStyle="https://www.onemap.gov.sg/maps/json/raster/mbstyle/Default.json"
    >
      {filteredProjects?.map((project, index) => {
        if (!coordinate[project]) return null;

        return (
          <Marker
            key={index}
            latitude={coordinate[project].LATITUDE}
            longitude={coordinate[project].LONGITUTDE}
            offset={[0, -50]}
          >
            <div style={{ position: "relative", textAlign: "center" }}>
              <GoDotFill
                size={80}
                opacity={0.3}
                className="hover:opacity-100 cursor-pointer"
                data-id={project}
                title={`Project:  ${project}\nProperty Type:  ${coordinate[project].nonlanded > coordinate[project].executive
                  ? "Non-Landed"
                  : "Executive Condo"
                  } \nLatitude:  ${coordinate[project].LATITUDE}\nLongitude:  ${coordinate[project].LONGITUTDE}\nUnits Available:  ${projectRelation[project][projectRelation[project].length - 1].unitsAvail}\nUnits Sold:  ${projectRelation[project][projectRelation[project].length - 1].soldToDate}\n% Sold:  ${Math.round((projectRelation[project][projectRelation[project].length - 1].soldToDate / projectRelation[project][projectRelation[project].length - 1].unitsAvail) * 100)}%
              `}
                color={
                  coordinate[project].nonlanded > coordinate[project].executive
                    ? "#460FFA"
                    : "#825CFF"
                }
              />
            </div>
          </Marker>
        );
      })}

      <ScaleControl />
    </Map>
  );
}
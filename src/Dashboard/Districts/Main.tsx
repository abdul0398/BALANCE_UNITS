import { MyContext } from "@/context/context";
import { districts } from "@/data/data";
import { useContext, useState } from "react";
import { projectRelation, segmentRelation } from "@/data/relations";
import WindowedSelect from "react-windowed-select";
import { customStyles } from "@/styles/select";

export default function Districts() {
  const {
    selectedDistrict,
    selectedProject,
    setSelectedDistrict,
    selectedType,
  } = useContext(MyContext);
  let filteredDistricts = districts;
  if (selectedProject) {
    filteredDistricts = districts.filter((district) => {
      return projectRelation[selectedProject].includes(district);
    });
  }

  if (selectedType !== "ALL") {
    filteredDistricts = filteredDistricts.filter((district) => {
      return segmentRelation[selectedType].districts.includes(district);
    });
  }

  const handleSelect = (event: any) => {
    setSelectedDistrict(event.value);
  };

  const options = filteredDistricts.map((district) => {
    return { value: district, label: district };
  });

  return (
    <div className="w-45">
      <WindowedSelect
        placeholder="Select Distict"
        options={options}
        value={
          selectedDistrict
            ? { value: selectedDistrict, label: selectedDistrict }
            : null
        }
        windowThreshold={50}
        styles={customStyles}
        menuPortalTarget={document.querySelector("body")}
        onChange={(e: any) => handleSelect(e)}
      />
    </div>
  );
}

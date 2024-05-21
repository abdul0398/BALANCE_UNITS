import { MyContext } from "@/context/context";
import { projects } from "@/data/data";
import { useContext, useState } from "react";
import { districtRelation, segmentRelation } from "@/data/relations";
import { projectRelation } from "@/data/projectListingRelation";
import WindowedSelect from "react-windowed-select";
import { customStyles } from "@/styles/select";

export default function Projects() {
  const {
    selectedDistrict,
    selectedProject,
    setSelectedProject,
    selectedType,
  } = useContext(MyContext);

  let filteredProjects = projects;
  if (selectedDistrict) {
    filteredProjects = projects.filter((project) => {
      return districtRelation[selectedDistrict].includes(project);
    });
  }

  if (selectedType !== "ALL") {
    filteredProjects = filteredProjects.filter((project) => {
      return segmentRelation[selectedType].projects.includes(project);
    });
  }

  const handleSelect = (e: any) => {
    setSelectedProject(e.value);
  };

  const options = filteredProjects.map((project) => {
    return { value: project, label: project };
  });

  return (
    <WindowedSelect
      placeholder="Select Project"
      options={options}
      value={
        selectedProject
          ? { value: selectedProject, label: selectedProject }
          : null
      }
      windowThreshold={50}
      styles={customStyles}
      menuPortalTarget={document.querySelector("body")}
      onChange={(e: any) => handleSelect(e)}
    />
  );
}

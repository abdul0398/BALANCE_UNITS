"use client";
import { MyContext } from "@/context/context";
import Dashboard from "../Dashboard/Main";
import { useState } from "react";
import { PropertyTypeEnum } from "@/types/context";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedType, setSelectedType] = useState<PropertyTypeEnum>(
    PropertyTypeEnum.ALL
  );
  const [heatMapSelectedProject, setHeatMapSelectedProject] =
    useState<string>("");

  return (
    <main className="w-full h-full">
      <MyContext.Provider
        value={{
          selectedDistrict,
          selectedProject,
          selectedType,
          heatMapSelectedProject,
          setHeatMapSelectedProject,
          setSelectedType,
          setSelectedDistrict,
          setSelectedProject,
        }}
      >
        <Dashboard />
      </MyContext.Provider>
    </main>
  );
}

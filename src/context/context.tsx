"use client";
import { PropertyTypeEnum } from "@/types/context";
import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

// Define the type for your context value
interface MyContextValue {
  selectedType: PropertyTypeEnum;
  setSelectedType: Dispatch<SetStateAction<PropertyTypeEnum>>;
  selectedDistrict: string;
  setSelectedDistrict: Dispatch<SetStateAction<string>>;
  selectedProject: string;
  setSelectedProject: Dispatch<SetStateAction<string>>;
  heatMapSelectedProject: string;
  setHeatMapSelectedProject: Dispatch<SetStateAction<string>>;
}

// Create the context with the correct type
export const MyContext = createContext<MyContextValue>({
  selectedType: PropertyTypeEnum.ALL,
  setSelectedType: () => {},
  selectedDistrict: "",
  setSelectedDistrict: () => {},
  heatMapSelectedProject: "",
  setHeatMapSelectedProject: () => {},
  selectedProject: "",
  setSelectedProject: () => {},
});

// Define your ContextProvider component
const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedType, setSelectedType] = useState<PropertyTypeEnum>(
    PropertyTypeEnum.ALL
  );
  const [heatMapSelectedProject, setHeatMapSelectedProject] =
    useState<string>("");

  // Provide the context value to children
  const contextValue: MyContextValue = {
    selectedType,
    setSelectedType,
    selectedDistrict,
    setSelectedDistrict,
    heatMapSelectedProject,
    setHeatMapSelectedProject,
    selectedProject,
    setSelectedProject,
  };

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};

export default ContextProvider;

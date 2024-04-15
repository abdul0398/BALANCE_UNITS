'use client'
import { MyContext } from "@/context/context";
import Dashboard from "../Dashboard/Main";
import {useState } from "react";
import { PropertyType } from "@/types/context";



export default function Home() {
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<PropertyType>(PropertyType.ALL);

  

  return (
    <main className="w-full h-full pt-12">
      <section>
        <h2 className="text-2xl text-center">URA Developer Sales Data (Balance Units)</h2>
      </section>
      <MyContext.Provider value={{selectedDistricts, selectedProjects, selectedType, setSelectedType, setSelectedDistricts, setSelectedProjects}}>
        <Dashboard />
      </MyContext.Provider >
    </main>
  );
}

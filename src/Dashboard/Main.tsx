"use client";
import { Button } from "@/components/ui/button";
import MapComponent from "./Map/Main";
import TableProjects from "./TableProjects/Main";
import PieCharts from "./Pie/Main";
// import Treemap from "./Heatmap/Main";
import BalanceUnits from "./BalanceUnits/Main";
import TableDistricts from "./TableDistricts/Main";
import { projectRelation } from "@/data/projectListingRelation";
import Sidebar from "./sidebar/Main";
import { useContext, useState } from "react";
import FilterBox from "@/ui/filterbox";
import { MyContext } from "@/context/context";
import { FaStreetView } from "react-icons/fa";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { SiCodeblocks } from "react-icons/si";
import { PropertyTypeEnum } from "@/types/context";
import dynamic from "next/dynamic";
const Districts = dynamic(() => import("./Districts/Main"), { ssr: false });
const Projects = dynamic(() => import("./Projects/Main"), { ssr: false });
const PropertyType = dynamic(() => import("./PropertyType/Main"), {
  ssr: false,
});

export default function Dashboard() {
  const [selectedView, setSelectedView] = useState<string>("project_table");
  const {
    selectedDistrict,
    selectedProject,
    setSelectedDistrict,
    setSelectedProject,
    setSelectedType,
    selectedType,
  } = useContext(MyContext);

  const projects = Object.keys(projectRelation).filter((project) => {
    const isAvailable =
      projectRelation[project][projectRelation[project].length - 1].unitsAvail -
        projectRelation[project][projectRelation[project].length - 1]
          .soldToDate !=
      0;
    return isAvailable;
  });
  const demoData = {
    name: "root",
    children: projects.map((project) => {
      return {
        name: project,
        value:
          projectRelation[project][projectRelation[project].length - 1]
            .unitsAvail -
          projectRelation[project][projectRelation[project].length - 1]
            .soldToDate,
      };
    }),
    value: 100,
  };

  const viewProvider = () => {
    switch (selectedView) {
      case "project_table":
        return <TableProjects />;
      case "district_table":
        return <TableDistricts />;
      case "map":
        return <MapComponent />;
      case "balance_units":
        return <BalanceUnits />;
      case "pie":
        return <PieCharts />;
      default:
        return <TableProjects />;
    }
  };

  const handleReset = () => {
    setSelectedType(PropertyTypeEnum.ALL);
    setSelectedDistrict("");
    setSelectedProject("");
  };

  const slideLeft = () => {
    const slider = document.querySelector(".filter-slider") as HTMLElement;
    slider.scrollLeft += 400;
  };

  const slideRight = () => {
    const slider = document.querySelector(".filter-slider") as HTMLElement;
    slider.scrollLeft -= 400;
  };

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="w-[90%] flex h-[90%]">
        <Sidebar
          selectedView={selectedView}
          setSelectedView={setSelectedView}
        />
        <main
          id="main-container"
          className="sm:w-5/6 w-full rounded-r-3xl ms-auto border  overflow-auto lg:p-2 shadow-md"
        >
          <div className="relative h-14">
            <Button
              variant="default"
              className="me-2 bg-[#0e4884] hover:bg-[#0e4884] absolute right-1 top-5"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
          <section className="flex flex-col justify-center">
            <div className="filter-slider h-48 mt-10 flex gap-8 overflow-x-scroll scroll-smooth mx-auto whitespace-nowrap justify-between w-[90%] p-2 no-scrollbar rounded-md">
              <FilterBox
                select={<Districts />}
                name="District"
                selected={selectedDistrict}
                icon={<SiCodeblocks className="text-2xl text-white" />}
              />
              <FilterBox
                select={<Projects />}
                name="Project"
                selected={selectedProject}
                icon={<SiCodeblocks className="text-2xl text-white" />}
              />
              <FilterBox
                select={<PropertyType />}
                name="Region"
                selected={selectedType}
                icon={<FaStreetView className="text-2xl text-white" />}
              />
            </div>
            <div className="text-center flex justify-center gap-2 mt-3">
              <div className="rounded-full h-8 w-8 flex justify-center items-center bg-[#0e4884]">
                <MdChevronLeft
                  onClick={() => {
                    slideRight();
                  }}
                  className=" text-2xl cursor-pointer mx-auto text-white"
                />
              </div>
              <div className="rounded-full h-8 w-8 flex justify-center items-center bg-[#0e4884]">
                <MdChevronRight
                  onClick={() => {
                    slideLeft();
                  }}
                  className="text-2xl cursor-pointer text-white"
                />
              </div>
            </div>
          </section>

          <section className="w-[90%] overflow-x-auto mx-auto border h-[700px] pb-3 mt-10 rounded-xl">
            <div className="min-w-[900px] w-full">
              <div className="bg-[#0e4884] w-full h-14 rounded-t-xl flex items-center ps-3">
                <Button
                  onClick={() => setSelectedView("project_table")}
                  variant="outline"
                  className={`font-bold mx-3 bg-[#0c3f74] text-white ${
                    selectedView == "project_table" ? "bg-white text-black" : ""
                  }`}
                >
                  Project Table
                </Button>
                <Button
                  onClick={() => setSelectedView("district_table")}
                  variant="outline"
                  className={`font-bold mx-3 bg-[#0c3f74] text-white ${
                    selectedView == "district_table"
                      ? "bg-white text-black"
                      : ""
                  }`}
                >
                  District Table
                </Button>

                <Button
                  onClick={() => setSelectedView("balance_units")}
                  variant="outline"
                  className={`font-bold mx-3 bg-[#0c3f74] text-white ${
                    selectedView == "balance_units" ? "bg-white text-black" : ""
                  }`}
                >
                  Balance Units
                </Button>
                <Button
                  onClick={() => setSelectedView("map")}
                  variant="outline"
                  className={`font-bold mx-3 bg-[#0c3f74] text-white ${
                    selectedView == "map" ? "bg-white text-black" : ""
                  }`}
                >
                  Map
                </Button>
                <Button
                  onClick={() => setSelectedView("pie")}
                  variant="outline"
                  className={`font-bold mx-3 bg-[#0c3f74] text-white ${
                    selectedView == "pie" ? "bg-white text-black" : ""
                  }`}
                >
                  Pie Chart
                </Button>
              </div>
              <div className="w-full p-5">{viewProvider()}</div>
            </div>
          </section>

          <section className="p-7 relative  bg-[url('/building-banner.jpeg')]  bg-cover bg-center before:bg-blue-400 bg-no-repeat w-[90%] mx-auto h-52 border rounded-xl mt-10">
            <div className="lg:w-2/3 md:2/3 w-full">
              <h2 className="lg:text-3xl md:text-2xl text-xl text-white z-20 opacity-100">
                Discover your dream condo rental and make it your home
              </h2>
            </div>
            <div className="text-[#0e4884] font-bold cursor-pointer h-9 w-28 flex justify-center bg-white items-center mt-5 rounded-md text-sm shadow-lg">
              Get Started
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

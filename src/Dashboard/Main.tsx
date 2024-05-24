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
import { useMediaQuery } from "react-responsive";
import { IoMenu } from "react-icons/io5";

import dynamic from "next/dynamic";
const Districts = dynamic(() => import("./Districts/Main"), { ssr: false });
const Projects = dynamic(() => import("./Projects/Main"), { ssr: false });
const PropertyType = dynamic(() => import("./PropertyType/Main"), {
  ssr: false,
});

export default function Dashboard() {
  const [selectedView, setSelectedView] = useState<string>("project_table");
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });
  const [isOpen, setIsOpen] = useState<boolean>(!isMobile);
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
  const sideBarHandler = () => {
    setIsOpen(!isOpen);
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
      <div className="h-full w-full flex justify-center items-center lg:p-2">
        <div className="w-[98%] flex h-[98%]">
          <Sidebar
            selectedView={selectedView}
            setSelectedView={setSelectedView}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isMobile={isMobile}
          />
          <main
            id="main-container"
            className="w-full pb-5 rounded-r-[40px] px-1 no-scrollbar rounded-l-[40px] lg:rounded-l-none md:rounded-l-none ms-auto border h-full overflow-auto lg:p-2 shadow-md"
          >
            <div className="relative h-14">
              <div className="flex justify-end px-2 h-8 mt-3">
                <Button
                  variant="default"
                  className="me-2 bg-[#0c3f74] font-bold hover:bg-[#0c3f74]"
                  onClick={handleReset}
                >
                  Reset
                </Button>
                {isMobile && (
                  <div className="opacity-50">
                    <IoMenu size={40} onClick={sideBarHandler} />
                  </div>
                )}
              </div>
            </div>
            <section>
              <div className="filter-slider lg:h-48 h-[400px] mt-5 grid lg:grid-cols-4 lg:gap-4 md:gap-2 gap-3 mx-auto grid-cols-2 lg:w-[90%] md:w-[90%] w-[100%] rounded-md">
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
            </section>

            <section className="lg:w-[90%] md:w-[90%] w-full overflow-x-auto overflow-y-hidden mx-auto border max-h-[700px] pb-3 mt-10 rounded-xl">
              <div className="min-w-[1200px] w-full">
                <div className="bg-[#0e4884] w-full h-14 rounded-t-xl flex items-center ps-3">
                  <Button
                    onClick={() => setSelectedView("project_table")}
                    variant="outline"
                    className={`font-bold mx-3 bg-[#0c3f74] text-white ${
                      selectedView == "project_table"
                        ? "bg-white text-black"
                        : ""
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
                      selectedView == "balance_units"
                        ? "bg-white text-black"
                        : ""
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
                <div className="w-full p-5 overflow-y-auto">
                  {viewProvider()}
                </div>
              </div>
            </section>

            <section className="p-7 relative mx-auto bg-[url('/building-banner.jpeg')]  bg-cover bg-center before:bg-blue-400 bg-no-repeat lg:w-[90%] md:w-[90%] w-[100%] h-52 border rounded-xl mt-10">
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
    </div>
  );
}

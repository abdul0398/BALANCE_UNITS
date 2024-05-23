"use client";

import Image from "next/image";
import React from "react";
import { BsGraphUp } from "react-icons/bs";
import { GrTransaction } from "react-icons/gr";
import { FaMapMarkedAlt } from "react-icons/fa";

export default function Sidebar({
  selectedView,
  setSelectedView,
  isOpen,
  setIsOpen,
  isMobile,
}: {
  selectedView: string | null;
  setSelectedView: Function;
  isOpen: boolean;
  setIsOpen: Function;
  isMobile: boolean;
}) {
  return (
    <div>
      {isOpen && (
        <div className="fixed h-[97%] lg:h-[100%] md:h-[100%] w-1/2 md:w-fit lg:w-fit md:z-0 z-50 lg:z-0 md:block md:relative lg:relative  lg:block">
          <aside
            id="default-sidebar"
            className="min-w-[300px] rounded-l-3xl h-full"
            aria-label="Sidebar"
          >
            <div className="h-full rounded-l-3xl overflow-y-auto  bg-[#0e4884] text-white">
              <div className="my-1">
                <Image
                  src="/logo.png"
                  alt="logo"
                  width={220}
                  height={220}
                  className="mx-auto"
                />
              </div>
              <div className="w-3/4 mx-auto bg-[#022446] py-2 rounded-md flex gap-2 flex-col">
                <div
                  onClick={() => {
                    setSelectedView("project_table");
                    if (isMobile) setIsOpen(false);
                  }}
                  className={`flex items-center cursor-pointer h-10 rounded-md w-[90%] mx-auto ${
                    selectedView === "project_table"
                      ? "bg-[#0e4884]"
                      : "bg-white "
                  }`}
                >
                  <h1
                    onClick={() => {
                      setSelectedView("project_table");
                      if (isMobile) setIsOpen(false);
                    }}
                    className={`"text-md flex items-center text-black cursor-pointer" ${
                      selectedView === "project_table" ? "text-white" : ""
                    }`}
                  >
                    <GrTransaction size={20} className="ms-2" />
                    <p className="ms-4">Project Table</p>
                  </h1>
                </div>
                <div
                  onClick={() => {
                    setSelectedView("district_table");
                    if (isMobile) setIsOpen(false);
                  }}
                  className={`flex items-center cursor-pointer h-10 rounded-md w-[90%] mx-auto ${
                    selectedView === "district_table"
                      ? "bg-[#0e4884]"
                      : "bg-white"
                  }`}
                >
                  <h1
                    onClick={() => {
                      setSelectedView("district_table");
                      if (isMobile) setIsOpen(false);
                    }}
                    className={`"text-md flex items-center  text-black cursor-pointer" ${
                      selectedView === "district_table" ? "text-white" : ""
                    }`}
                  >
                    <GrTransaction size={20} className="ms-2" />
                    <p className="ms-4">District Table</p>
                  </h1>
                </div>
                <div
                  onClick={() => {
                    setSelectedView("balance_units");
                    if (isMobile) setIsOpen(false);
                  }}
                  className={`flex items-center cursor-pointer h-10 rounded-md w-[90%] mx-auto ${
                    selectedView === "balance_units"
                      ? "bg-[#0e4884]"
                      : "bg-white "
                  }`}
                >
                  <h1
                    onClick={() => {
                      setSelectedView("balance_units");
                      if (isMobile) setIsOpen(false);
                    }}
                    className={`"text-md flex items-center text-black cursor-pointer" ${
                      selectedView === "balance_units" ? "text-white" : ""
                    }`}
                  >
                    <GrTransaction size={20} className="ms-2" />
                    <p className="ms-4">Balance units</p>
                  </h1>
                </div>
                <div
                  onClick={() => {
                    setSelectedView("map");
                    if (isMobile) setIsOpen(false);
                  }}
                  className={`flex items-center cursor-pointer h-10 rounded-md w-[90%] mx-auto ${
                    selectedView === "map" ? "bg-[#0e4884]" : "bg-white "
                  }`}
                >
                  <h1
                    onClick={() => {
                      setSelectedView("map");
                      if (isMobile) setIsOpen(false);
                    }}
                    className={`"text-md flex items-center text-black cursor-pointer" ${
                      selectedView === "map" ? "text-white" : ""
                    }`}
                  >
                    <FaMapMarkedAlt size={20} className="ms-2" />
                    <p className="ms-4">Map</p>
                  </h1>
                </div>
                <div
                  onClick={() => {
                    setSelectedView("pie");
                    if (isMobile) setIsOpen(false);
                  }}
                  className={`flex items-center cursor-pointer h-10 rounded-md w-[90%] mx-auto ${
                    selectedView === "pie" ? "bg-[#0e4884]" : "bg-white "
                  }`}
                >
                  <h1
                    onClick={() => {
                      setSelectedView("pie");
                      if (isMobile) setIsOpen(false);
                    }}
                    className={`"text-md flex items-center text-black cursor-pointer" ${
                      selectedView === "pie" ? "text-white" : ""
                    }`}
                  >
                    <BsGraphUp size={20} className="ms-2" />
                    <p className="ms-4">Pie Chart</p>
                  </h1>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

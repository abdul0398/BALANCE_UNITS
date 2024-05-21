"use client";

import Image from "next/image";
import React from "react";
import { BsGraphUp } from "react-icons/bs";
import { GrTransaction } from "react-icons/gr";
import { FaMapMarkedAlt } from "react-icons/fa";

export default function Sidebar({
  selectedView,
  setSelectedView,
}: {
  selectedView: string | null;
  setSelectedView: Function;
}) {
  return (
    <div className="hidden md:block lg:block h-full">
      <aside
        id="default-sidebar"
        className="min-w-[300px] rounded-l-3xl h-full"
        aria-label="Sidebar"
      >
        <div className="h-full rounded-l-3xl overflow-y-auto  bg-[#0e4884] text-white">
          <div className="my-5">
            <Image
              src="/logo.png"
              alt="logo"
              width={80}
              height={80}
              className="mx-auto"
            />
          </div>
          <div className="w-3/4 mx-auto bg-[#022446] py-2 rounded-md flex gap-2 flex-col">
            <div
              onClick={() => setSelectedView("project_table")}
              className={`flex items-center cursor-pointer h-10 rounded-md w-[90%] mx-auto ${
                selectedView === "project_table" ? "bg-[#0e4884]" : "bg-white "
              }`}
            >
              <h1
                onClick={() => setSelectedView("project_table")}
                className={`"text-md flex items-center text-black cursor-pointer" ${
                  selectedView === "project_table" ? "text-white" : ""
                }`}
              >
                <GrTransaction size={20} className="ms-2" />
                <p className="ms-4">Project Table</p>
              </h1>
            </div>
            <div
              onClick={() => setSelectedView("district_table")}
              className={`flex items-center cursor-pointer h-10 rounded-md w-[90%] mx-auto ${
                selectedView === "district_table" ? "bg-[#0e4884]" : "bg-white"
              }`}
            >
              <h1
                onClick={() => setSelectedView("district_table")}
                className={`"text-md flex items-center  text-black cursor-pointer" ${
                  selectedView === "district_table" ? "text-white" : ""
                }`}
              >
                <GrTransaction size={20} className="ms-2" />
                <p className="ms-4">District Table</p>
              </h1>
            </div>
            <div
              onClick={() => setSelectedView("balance_units")}
              className={`flex items-center cursor-pointer h-10 rounded-md w-[90%] mx-auto ${
                selectedView === "balance_units" ? "bg-[#0e4884]" : "bg-white "
              }`}
            >
              <h1
                onClick={() => setSelectedView("balance_units")}
                className={`"text-md flex items-center text-black cursor-pointer" ${
                  selectedView === "balance_units" ? "text-white" : ""
                }`}
              >
                <GrTransaction size={20} className="ms-2" />
                <p className="ms-4">Balance units</p>
              </h1>
            </div>
            <div
              onClick={() => setSelectedView("map")}
              className={`flex items-center cursor-pointer h-10 rounded-md w-[90%] mx-auto ${
                selectedView === "map" ? "bg-[#0e4884]" : "bg-white "
              }`}
            >
              <h1
                onClick={() => setSelectedView("map")}
                className={`"text-md flex items-center text-black cursor-pointer" ${
                  selectedView === "map" ? "text-white" : ""
                }`}
              >
                <FaMapMarkedAlt size={20} className="ms-2" />
                <p className="ms-4">Map</p>
              </h1>
            </div>
            <div
              onClick={() => setSelectedView("pie")}
              className={`flex items-center cursor-pointer h-10 rounded-md w-[90%] mx-auto ${
                selectedView === "pie" ? "bg-[#0e4884]" : "bg-white "
              }`}
            >
              <h1
                onClick={() => setSelectedView("pie")}
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
  );
}

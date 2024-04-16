'use client'
import { Button } from "@/components/ui/button";
import MapComponent from "./Map/Main";
import Districts from "./Districts/Main";
import TableProjects from "./TableProjects/Main";
import PieCharts from "./Pie/Main";
import Treemap from "./Heatmap/Main";
import Projects from "./Projects/Main";
import PropertyType from "./PropertyType/Main";
import BalanceUnits from "./BalanceUnits/Main";
import TableDistricts from "./TableDistricts/Main";
import { projectRelation } from "@/data/projectListingRelation";

export default function Dashboard() {


    const projects = Object.keys(projectRelation).filter((project) => {
        const isAvailable = projectRelation[project][projectRelation[project].length - 1].unitsAvail - projectRelation[project][projectRelation[project].length - 1].soldToDate != 0;
        return isAvailable;
    });
     const demoData = {
        name: 'root',
        children: projects.map((project) => {
            return {
                name: project,
                value: projectRelation[project][projectRelation[project].length - 1].unitsAvail - projectRelation[project][projectRelation[project].length - 1].soldToDate,
            };
        }),
        value:100
      };
    return (
        <main className="w-[1200px] h-full mx-auto mt-2 bg-[#f3f4f6] p-3">
            <section className="h-[400px] w-full mt-5 flex flex-row">
                <div className="w-1/2 h-full border ">
                    <MapComponent />
                </div>
                <div className="w-1/2 h-full border flex flex-col shadow-md sm:rounded-lg bg-white ms-1">
                    <div className="h-[20%]">
                        <PropertyType />
                    </div>
                    <div className="w-full h-[80%] border flex flex-row">
                        <div className="w-1/4 p-1">
                            <h2 className="text-center">Projects</h2>
                            <Projects />
                        </div>
                        <div className="w-1/4 p-1">
                            <h2 className="text-center">Districts</h2>
                            <Districts />
                        </div>
                        <div className="w-1/2 p-1">
                            <h2 className="text-center">Balance Units, Units Sold</h2>
                            <BalanceUnits />
                        </div>
                    </div>
                </div>
            </section>
            <section className="h-[600px] w-full mt-5 flex gap-1">
                <div className="h-full w-3/4">
                    <h2 className="text-center">Project Details</h2>
                    <TableProjects />
                </div>
                <div className="h-full w-1/4">
                    <h2 className="text text-center">Sold to Date and Balance Units</h2>
                    <div className="h-[100%] bg-white flex items-center shadow-md sm:rounded-lg">
                        <PieCharts />

                    </div>
                </div>
            </section>
            <section className="h-[600px] w-full mt-10 flex gap-1">
                <div className="h-full w-1/2 overflow-x-auto" >
                    <h2 className="text-center">Heat Map of Balance Units</h2>
                    <Treemap data={demoData} width={900} height={900} />
                </div>
                <div className="h-full w-1/2">
                    <h2 className="text text-center">Filter By Districts</h2>
                    <TableDistricts/>
                </div>
            </section>
        </main>
    );
}
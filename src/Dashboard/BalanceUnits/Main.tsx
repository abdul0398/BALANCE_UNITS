import { MyContext } from "@/context/context"
import { useContext } from "react"
import { data } from "@/data/data";

export default function BalanceUnits() {
    const { selectedDistricts, selectedProjects, selectedType } = useContext(MyContext)

    let filteredData = data;

    if (selectedDistricts.length > 0) {
        filteredData = data.filter((item) => {
            return selectedDistricts.some((district) => {
                return item.district == district;
            });
        });
    }

    if (selectedProjects.length > 0) {
        filteredData = data.filter((item) => {
            return selectedProjects.some((project) => {
                return item.project == project;
            });
        });
    }

    if (selectedType !== "ALL") {
        filteredData = filteredData.filter((item) => {
            return item.marketSegment == selectedType;
        });
    }


    let projects: any = {};

    filteredData.map((item) => {
        if (!projects[item.project]) {
            projects[item.project] = {
                listing: item.developerSales[item.developerSales.length - 1],
                developer: item.developer,
                district: item.district,
                marketSegment: item.marketSegment,
                propertyType: item.propertyType,
                street: item.street
            };
        }
    });
    return (
        <div className="border w-full h-[90%] flex flex-col overflow-auto bg-white p-1">
            {
                Object.keys(projects).map((project, index) => {
                    // Calculate total units (unitsAvail + soldToDate)
                    const totalUnits = projects[project].listing.unitsAvail + projects[project].listing.soldToDate;

                    // Calculate percentage widths
                    const availWidth = (projects[project].listing.unitsAvail / totalUnits) * 100;
                    const soldWidth = (projects[project].listing.soldToDate / totalUnits) * 100;

                    return (
                        <div className="flex mt-1" key={index}>
                            <div className="flex w-full">
                                <p className="text-xs w-1/2">
                                    {project.length > 10 ? project.slice(0, 10) + "..." : project}
                                </p>

                                <div className="bg-blue-800 text-white text-xs relative" style={{ width: `${availWidth}%` }}>

                                    <span className="absolute top-0 left-0 px-1 bg-blue-800">Available({projects[project].listing.unitsAvail - projects[project].listing.soldToDate})</span>
                                </div>
                                <div className="bg-blue-400 text-white text-xs relative" style={{ width: `${soldWidth}%` }}>
                                    <span className="absolute top-0 left-0 px-1 bg-blue-400">Sold({projects[project].listing.soldToDate})</span>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </div>

    );
}
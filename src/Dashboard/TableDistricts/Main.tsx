import { MyContext } from "@/context/context";
import { useContext } from "react";
import { data } from "@/data/data";
import { districtRelation } from "@/data/relations";
import { projectRelation } from "@/data/projectListingRelation";

export default function TableDistricts() {
  const { selectedDistrict, selectedProject, selectedType } =
    useContext(MyContext);

  let filteredData = data;

  if (selectedDistrict) {
    filteredData = data.filter((item) => selectedDistrict == item.district);
  }

  if (selectedProject) {
    filteredData = filteredData.filter(
      (item) => selectedProject == item.project
    );
  }

  if (selectedType !== "ALL") {
    filteredData = filteredData.filter(
      (item) => item.marketSegment === selectedType
    );
  }

  let projects: any = {};
  filteredData.map((item) => {
    const allSold =
      projectRelation[item.project][projectRelation[item.project].length - 1]
        .unitsAvail -
      projectRelation[item.project][projectRelation[item.project].length - 1]
        .soldToDate;
    if (!projects[item.project] && allSold != 0) {
      projects[item.project] = {
        listing:
          projectRelation[item.project][
            projectRelation[item.project].length - 1
          ],
        developer:
          projectRelation[item.project][
            projectRelation[item.project].length - 1
          ].developer,
        district:
          projectRelation[item.project][
            projectRelation[item.project].length - 1
          ].district,
        marketSegment:
          projectRelation[item.project][
            projectRelation[item.project].length - 1
          ].marketSegment,
        propertyType:
          projectRelation[item.project][
            projectRelation[item.project].length - 1
          ].propertyType,
        street:
          projectRelation[item.project][
            projectRelation[item.project].length - 1
          ].street,
      };
    }
  });

  const districtArray = Object.keys(districtRelation);
  const districtData = districtArray.map((district) => {
    const projectsInDistrict = districtRelation[district];
    const unitSoldInDistrict = projectsInDistrict.reduce(
      (acc, project: any) => {
        const projectData = projects[project];
        if (!projectData) return acc;
        if (
          projectData.listing.unitsAvail - projectData.listing.soldToDate !=
          0
        ) {
          return acc + projectData.listing.soldToDate;
        }
        return acc;
      },
      0
    );

    const totalUnitsInDistrict = projectsInDistrict.reduce(
      (acc, project: any) => {
        const projectData = projects[project];
        if (!projectData) return acc;
        if (
          projectData.listing.unitsAvail - projectData.listing.soldToDate !=
          0
        ) {
          return acc + projectData.listing.unitsAvail;
        }
        return acc;
      },
      0
    );

    return {
      [district]: {
        listing: {
          soldToDate: unitSoldInDistrict,
          unitsAvail: totalUnitsInDistrict,
        },
        marketSegment:
          ((unitSoldInDistrict / totalUnitsInDistrict) * 100).toFixed(2) + "%",
      },
    };
  });

  // Sort the districtData array by the name of the district
  districtData.sort((a, b) => {
    const districtA = Object.keys(a)[0];
    const districtB = Object.keys(b)[0];

    if (districtA < districtB) {
      return -1;
    }

    if (districtA > districtB) {
      return 1;
    }

    return 0;
  });

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-full">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-white p-3">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              District
            </th>
            <th scope="col" className="px-6 py-3">
              Units Sold
            </th>
            <th scope="col" className="px-6 py-3">
              Percent Sold
            </th>
            <th scope="col" className="px-6 py-3">
              Balance Units
            </th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {districtData.map((district, index) => {
            const districtName = Object.keys(district)[0];
            const districtData = district[districtName];
            if (
              districtData.listing.soldToDate === 0 &&
              districtData.listing.unitsAvail === 0
            )
              return null;
            return (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {districtName}
                </td>
                <td className="px-6 py-4">{districtData.listing.soldToDate}</td>
                <td className="px-6 py-4">{districtData.marketSegment}</td>
                <td className="px-6 py-4">
                  {districtData.listing.unitsAvail -
                    districtData.listing.soldToDate}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

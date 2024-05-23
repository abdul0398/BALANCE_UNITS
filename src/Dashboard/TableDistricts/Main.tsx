import { MyContext } from "@/context/context";
import { useContext, useState, useEffect } from "react";
import { data } from "@/data/data";
import { districtRelation } from "@/data/relations";
import { projectRelation } from "@/data/projectListingRelation";
import { FaSort } from "react-icons/fa";

export default function TableDistricts() {
  const { selectedDistrict, selectedProject, selectedType } =
    useContext(MyContext);

  const [listings, setListings] = useState<any[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null);

  useEffect(() => {
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
            ((unitSoldInDistrict / totalUnitsInDistrict) * 100).toFixed(2) +
            "%",
        },
      };
    });

    setListings(districtData);
  }, [selectedDistrict, selectedProject, selectedType]);

  const handleSort = (type: string) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === type &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }

    const sortedListings = [...listings].sort((a: any, b: any) => {
      const districtA = Object.keys(a)[0];
      const districtB = Object.keys(b)[0];
      const compare = (val1: number, val2: number) => {
        return direction === "ascending" ? val1 - val2 : val2 - val1;
      };

      if (type === "district") {
        if (districtA < districtB) {
          return direction === "ascending" ? -1 : 1;
        }
        if (districtA > districtB) {
          return direction === "ascending" ? 1 : -1;
        }
        return 0;
      } else if (type === "unitsSold") {
        return compare(
          a[districtA].listing.soldToDate,
          b[districtB].listing.soldToDate
        );
      } else if (type === "percentSold") {
        const percentA = parseFloat(a[districtA].marketSegment);
        const percentB = parseFloat(b[districtB].marketSegment);
        return compare(percentA, percentB);
      } else if (type === "balanceUnits") {
        const balanceA =
          a[districtA].listing.unitsAvail - a[districtA].listing.soldToDate;
        const balanceB =
          b[districtB].listing.unitsAvail - b[districtB].listing.soldToDate;
        return compare(balanceA, balanceB);
      }
      return 0;
    });

    setSortConfig({ key: type, direction });
    setListings(sortedListings);
  };

  return (
    <div className="relative overflow-x-auto  h-full">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 p-3">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              <div className="flex">
                District
                <span className="flex items-center ms-2 me-auto">
                  <FaSort
                    className="hover:cursor-pointer"
                    onClick={() => handleSort("district")}
                  />
                </span>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex">
                Units Sold
                <span className="flex items-center ms-2 me-auto">
                  <FaSort
                    className="hover:cursor-pointer"
                    onClick={() => handleSort("unitsSold")}
                  />
                </span>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex">
                Percent Sold
                <span className="flex items-center ms-2 me-auto">
                  <FaSort
                    className="hover:cursor-pointer"
                    onClick={() => handleSort("percentSold")}
                  />
                </span>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex">
                Balance Units
                <span className="flex items-center ms-2 me-auto">
                  <FaSort
                    className="hover:cursor-pointer"
                    onClick={() => handleSort("balanceUnits")}
                  />
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {listings.map((district, index) => {
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

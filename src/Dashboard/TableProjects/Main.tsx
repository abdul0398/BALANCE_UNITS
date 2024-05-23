import { MyContext } from "@/context/context";
import { useContext, useState, useEffect } from "react";
import { data } from "@/data/data";
import { projectRelation } from "@/data/projectListingRelation";
import { ListChildComponentProps } from "react-window";
import { FaSort } from "react-icons/fa";
import dynamic from "next/dynamic";
const List = dynamic(
  () => import("react-window").then((mod) => mod.FixedSizeList),
  {
    ssr: false, // Disable SSR for this component
  }
);

export default function TableProjects() {
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
      filteredData = data.filter((item) => item.district === selectedDistrict);
    }

    if (selectedProject.length > 0) {
      filteredData = data.filter((item) =>
        selectedProject.includes(item.project)
      );
    }

    if (selectedType !== "ALL") {
      filteredData = filteredData.filter(
        (item) => item.marketSegment === selectedType
      );
    }

    setListings(filteredData);
  }, [selectedDistrict, selectedProject, selectedType]);

  const Row: React.FC<ListChildComponentProps> = ({ index, style }) => {
    const item = listings[index];

    if (!item) {
      return null; // Return null if item is not available
    }
    return (
      <div
        key={index}
        style={style}
        className="h-14 grid gap-1 grid-cols-[8%_8%_8%_8%_8%_8%_8%_8%_8%_8%_8%_8%] border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
      >
        <div className="px-1 text-xs">{item.project}</div>
        <div className="px-1 text-xs">{item.developerSales[0].unitsAvail}</div>
        <div className="px-1 text-xs">
          {item.developerSales[0].launchedToDate}
        </div>
        <div className="px-1 text-xs">{item.marketSegment}</div>
        <div className="px-1 text-xs">{item.developerSales[0].soldToDate}</div>
        <div className="px-1 text-xs">
          {item.developerSales[0].unitsAvail -
            item.developerSales[0].soldToDate}
        </div>
        <div className="px-1 text-xs">{item.developerSales[0].medianPrice}</div>
        <div className="px-1 text-xs">{item.developerSales[0].lowestPrice}</div>
        <div className="px-1 text-xs">
          {item.developerSales[0].highestPrice}
        </div>
        <div className="px-1 text-xs">{"2024-02"}</div>
        <div className="px-1 text-xs">
          {item.developerSales[0].launchedInMonth}
        </div>
        <div className="px-1 text-xs">{item.developerSales[0].soldInMonth}</div>
      </div>
    );
  };

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
      const compare = (val1: number, val2: number) => {
        return direction === "ascending" ? val1 - val2 : val2 - val1;
      };

      if (
        type === "project" ||
        type === "district" ||
        type === "marketSegment"
      ) {
        if (a[type] < b[type]) {
          return direction === "ascending" ? -1 : 1;
        }
        if (a[type] > b[type]) {
          return direction === "ascending" ? 1 : -1;
        }
        return 0;
      } else if (type === "soldInMonth") {
        return compare(
          a.developerSales[0].soldInMonth,
          b.developerSales[0].soldInMonth
        );
      } else if (type === "unitsAvail") {
        return compare(
          a.developerSales[0].unitsAvail,
          b.developerSales[0].unitsAvail
        );
      } else if (type === "soldToDate") {
        return compare(
          a.developerSales[0].soldToDate,
          b.developerSales[0].soldToDate
        );
      } else if (type === "balanceUnits") {
        const balanceA =
          a.developerSales[0].unitsAvail - a.developerSales[0].soldToDate;
        const balanceB =
          b.developerSales[0].unitsAvail - b.developerSales[0].soldToDate;
        return compare(balanceA, balanceB);
      } else if (type === "highestPrice") {
        return compare(
          a.developerSales[0].highestPrice,
          b.developerSales[0].highestPrice
        );
      } else if (type === "lowestPrice") {
        return compare(
          a.developerSales[0].lowestPrice,
          b.developerSales[0].lowestPrice
        );
      } else if (type === "launchedToDate") {
        return compare(
          a.developerSales[0].launchedToDate,
          b.developerSales[0].launchedToDate
        );
      } else if (type === "launchedInMonth") {
        return compare(
          a.developerSales[0].launchedInMonth,
          b.developerSales[0].launchedInMonth
        );
      } else if (type === "unitsSold") {
        return compare(
          a.developerSales[0].soldToDate,
          b.developerSales[0].soldToDate
        );
      } else if (type === "medianPrice") {
        return compare(
          a.developerSales[0].medianPrice,
          b.developerSales[0].medianPrice
        );
      }
      return 0;
    });

    setSortConfig({ key: type, direction });
    setListings(sortedListings);
  };

  let projects: any = {};
  listings.map((item) => {
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
  return (
    <div className="">
      <h1 className="text-center">Units Sold in Report Month</h1>
      <div className="bg-white w-full overflow-auto px-2">
        <div className="flex flex-col bg-white">
          <div className="overflow-x-auto sm:mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm: lg:px-8">
              <div className="overflow-hidden">
                <div className="min-w-full text-left text-xs font-light overflow-hidden">
                  <div className="border-b font-medium mt-3 dark:border-neutral-500 grid gap-1 grid-cols-[8%_8%_8%_8%_8%_8%_8%_8%_8%_8%_8%_8%_8%] text-xs">
                    <div className="px-1 text-xs flex">
                      Project
                      <span className="flex items-center ms-2">
                        <FaSort
                          className="hover:cursor-pointer"
                          onClick={() => handleSort("project")}
                        />
                      </span>
                    </div>
                    <div className="px-1 text-xs flex">
                      Unit Avail
                      <span className="flex items-center ms-2 mx-auto">
                        <FaSort
                          className="hover:cursor-pointer"
                          onClick={() => handleSort("unitsAvail")}
                        />
                      </span>
                    </div>
                    <div className="px-1 text-xs flex">
                      LaunchtoDate
                      <span className="flex items-center ms-2 me-auto">
                        <FaSort
                          className="hover:cursor-pointer"
                          onClick={() => handleSort("launchedToDate")}
                        />
                      </span>
                    </div>
                    <div className="px-1 text-xs">Region</div>
                    <div className="px-1 text-xs flex">
                      Units Sold
                      <span className="flex items-center ms-2 me-auto">
                        <FaSort
                          className="hover:cursor-pointer"
                          onClick={() => handleSort("unitsSold")}
                        />
                      </span>
                    </div>
                    <div className="px-1 text-xs flex">
                      Balance Units
                      <span className="flex items-center ms-2 me-auto">
                        <FaSort
                          className="hover:cursor-pointer"
                          onClick={() => handleSort("balanceUnits")}
                        />
                      </span>
                    </div>
                    <div className="px-1 text-xs flex">
                      Median Price ($psf)
                      <span className="flex items-center ms-2 me-auto">
                        <FaSort
                          className="hover:cursor-pointer"
                          onClick={() => handleSort("medianPrice")}
                        />
                      </span>
                    </div>
                    <div className="px-1 text-xs flex">
                      Lowest Price($psf)
                      <span className="flex items-center ms-2 me-auto">
                        <FaSort
                          className="hover:cursor-pointer"
                          onClick={() => handleSort("lowestPrice")}
                        />
                      </span>
                    </div>
                    <div className="px-1 text-xs flex">
                      Highest Price($psf)
                      <span className="flex items-center ms-2 me-auto">
                        <FaSort
                          className="hover:cursor-pointer"
                          onClick={() => handleSort("highestPrice")}
                        />
                      </span>
                    </div>
                    <div className="px-1 text-xs flex">Latest Month</div>
                    <div className="px-1 text-xs flex">
                      Launched In Month
                      <span className="flex items-center ms-2 me-auto">
                        <FaSort
                          className="hover:cursor-pointer"
                          onClick={() => handleSort("launchedInMonth")}
                        />
                      </span>
                    </div>
                    <div className="px-1 text-xs flex">
                      Sold In month
                      <span className="flex items-center ms-2 me-auto">
                        <FaSort
                          className="hover:cursor-pointer"
                          onClick={() => handleSort("soldInMonth")}
                        />
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden mt-5">
                    <List
                      height={700}
                      itemCount={listings.length}
                      itemSize={50}
                      width={"100%"}
                    >
                      {Row}
                    </List>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { MyContext } from "@/context/context"
import { useContext } from "react"
import { data } from "@/data/data"
import { projectRelation } from "@/data/projectListingRelation"

export default function TableProjects() {

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
        const allSold = projectRelation[item.project][projectRelation[item.project].length - 1].unitsAvail - projectRelation[item.project][projectRelation[item.project].length - 1].soldToDate;
        if (!projects[item.project] && allSold != 0) {
            projects[item.project] = {
                listing: projectRelation[item.project][projectRelation[item.project].length - 1],
                developer: projectRelation[item.project][projectRelation[item.project].length - 1].developer,
                district: projectRelation[item.project][projectRelation[item.project].length - 1].district,
                marketSegment: projectRelation[item.project][projectRelation[item.project].length - 1].marketSegment,
                propertyType: projectRelation[item.project][projectRelation[item.project].length - 1].propertyType,
                street: projectRelation[item.project][projectRelation[item.project].length - 1].street
            };
        }
    })

    return (

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-full">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-white p-3">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Project
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Type
                        </th>
                        <th scope="col" className="px-6 py-3">
                            District
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Unit Avail
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Launched to Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Units SOld
                        </th>
                        <th scope="col" className="px-6 py-3">
                            % Sold
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Balance Units
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Latest Month Sales
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Mediun Price ($psf)
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Lowest Price($psf)
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Highest Price($psf)
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Latest Month
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Launched In Month
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Sold In month
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Developer
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Region
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Street
                        </th>


                    </tr>
                </thead>
                <tbody className="text-xs">
                    

                    {
                        Object.keys(projects).map((project, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {project}
                                </th>
                                <td className="px-6 py-4">
                                    {projects[project].propertyType}
                                </td>
                                <td className="px-6 py-4">
                                    {projects[project].district}
                                </td>
                                <td className="px-6 py-4">
                                    {projects[project].listing.unitsAvail}
                                </td>
                                <td className="px-6 py-4">
                                    {projects[project].listing.launchedToDate}
                                </td>
                                <td className="px-6 py-4">
                                    {projects[project].listing.soldToDate}
                                </td>
                                <td className="px-6 py-4">
                                    {Math.floor(projects[project].listing.soldToDate / projects[project].listing.unitsAvail * 100)}%
                                </td>
                                <td className="px-6 py-4">
                                    {projects[project].listing.unitsAvail - projects[project].listing.soldToDate}
                                </td>
                                <td className="px-6 py-4">
                                    {projects[project].listing.soldInMonth}
                                </td>
                                <td className="px-6 py-4">
                                    {projects[project].listing.medianPrice}
                                </td>
                                <td className="px-6 py-4">
                                    {projects[project].listing.lowestPrice}
                                </td>
                                <td className="px-6 py-4">
                                    {projects[project].listing.highestPrice}
                                </td>
                                <td className="px-6 py-4">
                                    2024-02
                                </td>
                                <td className="px-6 py-4">
                                    {projects[project].listing.launchedInMonth}
                                </td>
                                <td className="px-6 py-4">
                                    {projects[project].listing.soldInMonth}
                                </td>
                                <td className="px-6 py-4">
                                    {projects[project].developer}
                                </td>
                                <td className="px-6 py-4">
                                    {projects[project].marketSegment}
                                </td>
                                <td className="px-6 py-4">
                                    {projects[project].street}
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>

    )
}
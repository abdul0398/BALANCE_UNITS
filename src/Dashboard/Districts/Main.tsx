import { MyContext } from "@/context/context"
import { districts } from "@/data/data"
import { useContext, useState } from "react"
import { projectRelation, segmentRelation } from "@/data/relations"



export default function Districts() {
    const { selectedDistricts, selectedProjects, setSelectedDistricts, selectedType } = useContext(MyContext)
    const [searchQuery, setSearchQuery] = useState("")
    let filteredDistricts = districts;
    if (selectedProjects.length > 0) {
        filteredDistricts = districts.filter((district) => {
            return selectedProjects.some((project) => {
                return projectRelation[project].includes(district);
            });
        });
    }

    if (selectedType !== "ALL") {
        filteredDistricts = filteredDistricts.filter((district) => {
            return segmentRelation[selectedType].districts.includes(district);
        });
    }


    const onCheckboxChange = (district: string, checked: boolean) => {
        if (checked) {
            setSelectedDistricts([...selectedDistricts, district])
        } else {
            setSelectedDistricts(selectedDistricts.filter((selectedDistrict) => selectedDistrict !== district))
        }
    }

    filteredDistricts = filteredDistricts.filter((district) => {
        return district.toLowerCase().includes(searchQuery.toLowerCase())
    })



    return (
        <section className="overflow-y-auto overflow-x-hidden h-[90%]">
            <div className="h-full bg-white overflow-auto min-w-[150px]">
                <input
                    type="text"

                    className="mb-2 w-full h-3 border-0 rounded-none focus:outline-none px-3 py-1 text-sm"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="pb-1 px-2 text-xsm">
                    {
                        filteredDistricts.map((district, index) => {
                            return (
                                <div key={index} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        onChange={(e) => onCheckboxChange(district, e.target.checked)}
                                        className="mr-2"
                                    />
                                    <p className="ms-1 text-xs text-slate-600 ">D{district.length > 10 ? district.substring(0, 10) + "..." : district} { }</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}
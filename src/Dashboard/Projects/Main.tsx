import { MyContext } from "@/context/context"
import { projects } from "@/data/data"
import { useContext, useState } from "react"
import { districtRelation , segmentRelation} from "@/data/relations"
import { projectRelation } from "@/data/projectListingRelation"


export default function Projects() {
    const { selectedDistricts, selectedProjects, setSelectedProjects, selectedType } = useContext(MyContext)
    const [searchQuery, setSearchQuery] = useState("")


    let filteredProjects = projects;
    if (selectedDistricts.length > 0) {
        filteredProjects = projects.filter((project) => {
            return selectedDistricts.some((district) => {
                console.log(district, project);
                return districtRelation[district].includes(project);
            });
        });
    }


    if (selectedType !== "ALL") {
        filteredProjects = filteredProjects.filter((project) => {
            return segmentRelation[selectedType].projects.includes(project);
        });
    }




    const onCheckboxChange = (project: string, checked: boolean) => {
        if (checked) {
            setSelectedProjects([...selectedProjects, project])
        } else {
            setSelectedProjects(selectedProjects.filter((selectedProject) => selectedProject !== project))
        }
    }

    filteredProjects = filteredProjects.filter((project) => {
         const isMatch = project.toLowerCase().includes(searchQuery.toLowerCase());
         const isAvailable = projectRelation[project][projectRelation[project].length - 1].unitsAvail - projectRelation[project][projectRelation[project].length - 1].soldToDate != 0;

            return isMatch && isAvailable;


    })

    return (
        <section className="overflow-y-auto overflow-x-auto h-[90%]">
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
                        filteredProjects.map((project, index) => {
                            return (
                                <div key={index} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        onChange={(e) => onCheckboxChange(project, e.target.checked)}
                                        className="mr-2"
                                    />
                                    <p className="ms-1 text-xs text-slate-600 ">{project.length > 10 ? project.substring(0, 10) + "..." : project} { }</p>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </section>
    )
}
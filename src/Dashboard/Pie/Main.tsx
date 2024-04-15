'use client'
import { MyContext } from "@/context/context";
import { registerables } from "chart.js";
import { Chart } from "chart.js";
import { useContext } from "react";
import { Pie } from "react-chartjs-2";
import { data } from "@/data/data";
import { projectRelation } from "@/data/projectListingRelation";



Chart.register(...registerables);

export default function PieCharts() {
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


    let soldToDate = 0;
    let balanceUnits = 0;

    let projects: any = [];

    filteredData.map((item) => {
        if (!projects.includes(item.project)) {
            projects.push(item.project)
        }
    })
    projects.map((project: any) => {
        const projectData = projectRelation[project];
        if (projectData[projectData.length - 1].unitsAvail - projectData[projectData.length - 1].soldToDate != 0) {
            balanceUnits += projectData[projectData.length - 1].unitsAvail - projectData[projectData.length - 1].soldToDate;
            soldToDate += projectData[projectData.length - 1].soldToDate;
        }
    })

    const ChartData = {
        labels: ['Sold to Date', 'Balance Units'],
        datasets: [
            {
                data: [soldToDate, balanceUnits],
                backgroundColor: [
                    '#6DA8E4',
                    '#167be1',
                ],
                borderWidth: 0,
            }
        ]
    }
    return (
        <div className="chart-container">
            <Pie
                data={ChartData}
            />
        </div>
    );
}
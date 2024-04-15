import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts'

const Treemap = () => {
 const options = {
    chart: {
      height: 350,
      type: "treemap",
    },
    series: [
      {
        data: [
          {
            x: "New Delhi",
            y: 218,
          },
          {
            x: "Kolkata",
            y: 149,
          },
          {
            x: "Mumbai",
            y: 184,
          },
          {
            x: "Ahmedabad",
            y: 55,
          },
          {
            x: "Bangaluru",
            y: 84,
          },
          {
            x: "Pune",
            y: 31,
          },
          {
            x: "Chennai",
            y: 70,
          }
        ],
      },
    ]
  }
  return (
    <div id="treemap">
      
    </div>
    // ApexCharts.exec('treemap', options )
  );
}

export default Treemap;

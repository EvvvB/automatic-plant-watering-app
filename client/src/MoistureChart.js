import React, { useEffect } from "react";
import { useState } from "react";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import dateFormat from './functions.js/dateFormat'
const axios = require("axios");





function MoistureChart(props) {

    const [moistureLevels, setMoistureLevels] = useState([]);


const getMoistureLevels = () => {
    axios
      .get("/api/moisture")
      .then((res) => {
        const moistureLevels = res.data;
        //console.log(res.data);
        setMoistureLevels(moistureLevels);
      })
      .catch((err) => console.error(`Error: ${err}`));
  };

  useEffect(() => {
    getMoistureLevels();
  }, []);
//console.log(moistureLevels)

let moisturePercentage = []
let moistureDate = []

moistureLevels.forEach((obj, index)=>{
    moisturePercentage[index] = obj.percentage
    moisturePercentage[index] = typeof(moisturePercentage[index]) == "undefined" ? 0 : obj.percentage
    
    moistureDate[index] = obj.date
    moistureDate[index] = typeof(moistureDate[index]) == "undefined" ? '0' : obj.date
    moistureDate[index] = dateFormat(moistureDate[index])
})

//console.log(moisturePercentage)
const options = {
    chart: {
        type: 'area'
    },
    accessibility: {
        description: 'Chart of your plants moisture level at any given time of day in 15 minutes intervals'
    },
    title: {
        text: 'Moisture Level vs Time'
    },
    // subtitle: {
    //     text: 'Sources: <a href="https://thebulletin.org/2006/july/global-nuclear-stockpiles-1945-2006">' +
    //         'thebulletin.org</a> &amp; <a href="https://www.armscontrol.org/factsheets/Nuclearweaponswhohaswhat">' +
    //         'armscontrol.org</a>'
    // },
    xAxis: {
        categories:moistureDate,
        allowDecimals: false,
        labels: {
            formatter: function () {
                return this.value; // clean, unformatted number for year
            }
        },
        accessibility: {
            rangeDescription: 'Range: 1940 to 2017.'
        }
    },
    yAxis: {
        title: {
            text: 'Nuclear weapon states'
        },
        labels: {
            formatter: function () {
                return this.value + '%';
            }
        }
    },
    tooltip: {
        pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
    },
    // plotOptions: {
    //     area: {
    //         pointStart: 1940,
    //         marker: {
    //             enabled: false,
    //             symbol: 'circle',
    //             radius: 2,
    //             states: {
    //                 hover: {
    //                     enabled: true
    //                 }
    //             }
    //         }
    //     }
    // },
    series: [{
        name: 'Moisture Level',
        data: moisturePercentage
    }]
  }



    return(
    <div style={{ height: "500px", padding: "50px" }}>
    <HighchartsReact
    highcharts={Highcharts}
    options={options}
    />
    </div>
    )

}

export default MoistureChart;
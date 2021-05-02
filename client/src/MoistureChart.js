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
    let percentage = obj.percentage
    percentage = typeof(percentage) == "undefined" ? 0 : obj.percentage

    let moisture = obj.date
    moisture = typeof(moisture) == "undefined" ? '0' : obj.date
    moisture = dateFormat(moisture)

    let findminutes = moisture.indexOf(':') + 1
    findminutes = moisture.substr(findminutes, 2)

    if( findminutes === "00"){
        moisturePercentage.push(percentage)
        moistureDate.push(moisture)
    }

})

moisturePercentage = moisturePercentage.reverse()
moistureDate = moistureDate.reverse()

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
            rangeDescription: 'Last 24 hours'
        }
    },
    yAxis: {
        title: {
            text: 'Moisture Level'
        },
        labels: {
            formatter: function () {
                return this.value + '%';
            }
        }
    },
    tooltip: {
        pointFormat: '{series.name}  <b>{point.y:,.0f}</b><br/>'
    },

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
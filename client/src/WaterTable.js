import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useState } from "react";
import dateFormat from "./functions.js/dateFormat"
const axios = require("axios");

function WaterTable(props) {
  const [watertimes, setWatertimes] = useState([]);
  

  const getSomeWatertimes = () => {
    axios
      .get("/api/watertime")
      .then((res) => {
        const someWatertimes = res.data;
        //console.log(res.data);
        setWatertimes(someWatertimes);
      })
      .catch((err) => console.error(`Error: ${err}`));
  };

  useEffect(() => {
    getSomeWatertimes();
  }, []);




  //console.log(watertimes);
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Most Recent</th>
          <th>Seconds</th>
          <th>Date/Time</th>
        </tr>
      </thead>
      <tbody>
      {watertimes.map((watertime, index) => {
        return (
          
            <tr key={index}>
              <th>{index + 1}</th>
              <th>{watertime.seconds}</th>
              <th>{dateFormat(watertime.date)}</th>
            </tr>
          
        );
        
      })}
      </tbody>
    </Table>
  );
}

export default WaterTable;

// watertimes.map((id, seconds,) => {
//   return (
//   <tbody key={i}>
//     <tr key={i}>
//     <th>{i+1}</th>
//     <th>{v.seconds}</th>
//     <th>{v.date}</th>
//     </tr>
//   </tbody>

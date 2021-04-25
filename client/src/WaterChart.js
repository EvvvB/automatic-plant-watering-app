
import React from 'react'
import Table from 'react-bootstrap/Table'

function WaterChart(props) {
  return (

    <Table striped bordered hover>
          <thead>
    <tr>
      <th>#</th>
      <th>Seconds</th>
      <th>Date/Time</th>
    </tr>
  </thead>
        { props.water.map((v, i) => {
                return (
                <tbody key={i}>
                  <tr key={i}>
                  <th>{i+1}</th>
                  <th>{v[0]}</th>
                  <th>{v[1]}</th>
                  </tr>
                </tbody>
                    )})
                }
    </Table>
  );
}

export default WaterChart;
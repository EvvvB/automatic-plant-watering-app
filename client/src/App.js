import WaterForm from './WaterForm'
import WaterChart from './WaterChart'
import { useState } from 'react';
import Container from "react-bootstrap/Container";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [waterLogs, setWaterLogs] = useState([])
  const addWaterLog = (log) => {
    let logs = [...waterLogs, log];
    setWaterLogs(logs); 
  }
  
  
  
  
  
    return (
      <div>
        <Container>
        <WaterForm addWaterLog={addWaterLog}/>
        <p>Past 10 watering times:</p>
        <WaterChart water={waterLogs}/>
        </Container>
      </div>
    );
  }

export default App;

import WaterForm from './WaterForm'
import WaterTable from './WaterTable'
import MoistureChart from './MoistureChart'
import { useState } from 'react';
import Container from "react-bootstrap/Container";
import Header from './Header'
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
        <Header/>
        <WaterForm addWaterLog={addWaterLog}/>
        <MoistureChart/>
        <h5><u>Past 12 watering times:</u></h5>
        <WaterTable water={waterLogs}/>
        </Container>
      </div>
    );
  }

export default App;

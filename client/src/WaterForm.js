import React from "react";
import { useState } from "react";
//import { setState } from "react";
import Form from "react-bootstrap/Form";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button";
//import text from "body-parser/lib/types/text";
//import axios from '../axios';
const axios = require("axios");

function WaterForm({ addWaterLog }) {
  const [waterTime, setWaterTime] = useState(""); // creating a state object in order to keep track of data
  const [confirmWater, setConfirmWater] = useState(false)

  const handleSubmit = (e, water) => {
    //submit handling function
    addWaterLog([waterTime]);

    axios
      .post("http://localhost:5000/water", {
        time: water,
      })
      .then(function (response) {
        console.log(response);
      });
    e.preventDefault();
    setWaterTime(0);
  };

  const handleCheckBox = (e) =>{
      setConfirmWater(!confirmWater)
      console.log(confirmWater)
  }

  let textVerify = !(waterTime >= 1 && waterTime <= 10);
  let confirmVerify = !(confirmWater)
  let fullVerify = textVerify || confirmVerify
  return (
    //<Container>
        <Card style={{marginTop: "100px", padding: "20px"}}>
        <Container>
      <Form onSubmit={e => {handleSubmit(e, waterTime)}}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Seconds to Water Plant (1 - 10)</Form.Label>
          <Form.Control
            name="waterTime"
            type="number"
            maxLength="2"
            onChange={(e) => setWaterTime(e.target.value)}
            value={waterTime}
            placeholder="0"
          />
          {textVerify ? (
            <p className="text-muted"> Number must be between 1 and 10 </p>
          ) : null}
        </Form.Group>
        <p>Are you sure you want to water?</p>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check
            onChange={(e) => handleCheckBox()}
           type="checkbox" label="Yes, I am sure!" />
        </Form.Group>

        <Button
          disabled={fullVerify}
          type="submit"
          value="Add Log"
          variant="primary"
        >
          Submit
        </Button>
      </Form>
      </Container>
      </Card>
   // </Container>
  );
}

export default WaterForm;

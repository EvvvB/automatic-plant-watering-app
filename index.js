const express = require('express')
//CORS for browser compatibility
const cors = require('cors')
// Create the server
const app = express()

const axios = require("axios");

const bodyParser = require("body-parser");






//path for serving REACT from node requests
const path = require('path')
app.use(express.static(path.join(__dirname, 'client/build')))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors())
// Choose the port and start the server

app.get("/test",(req, res)=>{
    res.send("works!");
})


app.post("/water", (req, res) => {
    let time = req.body.time;
    // console.log(time);
  
    // let waterInstance = new waterData({
    //   seconds: time,
    // });
  
    axios
      .post("https://mattbobbleton.ngrok.io/waterpump", {
        time: time,
      })
      .then((res) => {
        console.log(`statusCode: ${res.statusCode}`);
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  
    // waterInstance.save(function (err, doc) {
    //   if (err) return console.error(err);
    //   res.send("test");
    //   console.log("Document inserted succussfully!");
    // });
  });












// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'))
  })

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Using ${PORT}`)
})
const express = require("express");
//CORS for browser compatibility
const cors = require("cors");
// Create the server
const app = express();

const axios = require("axios");

const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const { Schema } = mongoose;
const dbAddress = process.env.DB || "mongodb://localhost:27017/wateringApp";
//const { Parser } = require('json')

//const tempadd = 'mongodb+srv://evvv:j15akbg93@wateringdata.b3di5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(dbAddress, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// creating to schema object for moisture (mongoose)
const moistureSchema = new Schema({
  percentage: Number,
  date: { type: Date, default: Date.now },
});
const Moisture = mongoose.model("Moisture", moistureSchema);

// creating to schema object for water times (mongoose)
const watertimeSchema = new Schema({
  seconds: Number,
  date: { type: Date, default: Date.now },
});
const Watertime = mongoose.model("Watertime", watertimeSchema);

//path for serving REACT from node requests
const path = require("path");
app.use(express.static(path.join(__dirname, "client/build")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
// Choose the port and start the server

app.get("/test", (req, res) => {
  res.send("works!");
});


app.get("/api/watertime", (req, res) => {
  Watertime.find({}, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  }).sort({_id:-1}).limit(12);
});

app.get("/api/moisture", (req, res) => {
  Moisture.find({}, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  }).sort({_id:-1}).limit(20);
});



app.post("/api/watertime", (req, res) => {
  let seconds = req.body.seconds;
  axios
    .post("https://mattbobbleton.ngrok.io/waterpump", {
      time: seconds,
    })
    .then((res) => {
      // console.log(`statusCode: ${res.statusCode}`);
      // console.log(res);
 
      let watertimeInstance = new Watertime({
        seconds: seconds,
      });
      console.log("test");
      watertimeInstance.save((err, doc) => {
        if (err) return console.error(err);

        console.log("req sent");
      });

    })
    .catch((error) => {
      console.error(error);
    });
    res.json(req.body);
});

app.post("/api/moisture", (req, res) => {
  let percentage = req.body.percentage;
  //let date = req.body.date;
  let moistureInstance = new Moisture({
    percentage: percentage,
  });
  console.log("test");
  moistureInstance.save((err, doc) => {
    if (err) return console.error(err);

    console.log("req sent");
  });
  res.json(req.body);
});

// app.post("/api/watertime", (req, res) => {
//   let seconds = req.body.seconds;
//   let watertimeInstance = new Watertime({
//     seconds: seconds,
//   });
//   console.log("test");
//   watertimeInstance.save((err, doc) => {
//     if (err) return console.error(err);

//     console.log("req sent");
//   });
//   res.json(req.body);
// });

// Anything that doesn't match the above, send back index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Using ${PORT}`);
});

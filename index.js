const express = require('express')
//CORS for browser compatibility
const cors = require('cors')
// Create the server
const app = express()


app.use(cors())
// Choose the port and start the server

app.get("/",(req, res)=>{
    res.send("works!");
})


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Using ${PORT}`)
})
const express = require('express')
//CORS for browser compatibility
const cors = require('cors')
// Create the server
const app = express()
//path for serving REACT from node requests
const path = require('path')
app.use(express.static(path.join(__dirname, 'client/build')))

app.use(cors())
// Choose the port and start the server

app.get("/test",(req, res)=>{
    res.send("works!");
})

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'))
  })

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Using ${PORT}`)
})
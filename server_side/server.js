// PACKAGES 
const express = require('express')
const app = express()
const router = express.Router()
const logger = require('./middlewares/logger.js') 
const helmet = require('helmet') 
const cors = require ('cors')
const port = process.env.PORT || 8080
const dotenv = require ('dotenv')
dotenv.config()

// MIDDLEWARE 
app.use(logger)
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// CONTROLLERS 
const authRoute = require('./controllers/auth')
const assetsRoute = require('./controllers/assets')
const liabilitiesRoute = require('./controllers/liabilities')

// ROUTES 
app.use("/api/auth", authRoute)
app.use("/api/asset", assetsRoute)
app.use("/api/liability", liabilitiesRoute)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// SERVER EXECUTION
app.listen(port, () => {
    console.log(`Magic happening at port: ${port}`)
})

if (process.env.NODE_ENV === 'production') {
    const path = require('path')
    app.use(express.static(path.join(__dirname, 'build')));
  
    app.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname, 'build', 'index.html'));
    })
}
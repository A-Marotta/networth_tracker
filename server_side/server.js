// --- PACKAGES --- //
const express = require('express')
const app = express()
const router = express.Router()
const logger = require('./middlewares/logger.js') // logging middleware for debugging
const helmet = require('helmet') // securing requests
const cors = require ('cors') // API requests blocked by CORS policy (http)
const port = process.env.PORT || 8080

const dotenv = require ('dotenv')
dotenv.config()

// --- DATABASE --- //
const run_sql = require('./db/db')

// --- MIDDLEWARE --- //
app.use(logger)
// allowing POST requests to send parameters in the body
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// --- CONTROLLERS --- //
const authRoute = require('./controllers/auth')

// --- ROUTES --- //
app.use("/api/auth", authRoute)

app.get('/', (req, res) => {
    res.send('Hello World!')
})
  

// Start server
app.listen(port, () => {
    console.log(`Magic happening at port: ${port}`)
})

// Deployment of React build
if (process.env.NODE_ENV === 'production') {
    const path = require('path')
    app.use(express.static(path.join(__dirname, 'build')));
  
    app.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
}
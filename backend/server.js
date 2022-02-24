const app = require('./app')
const dotenv = require('dotenv')
const connectDatabase = require('./config/database')

// @Error Handler3
// Handling Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`)
  process.exit(1)
})

// Configuration
dotenv.config({path:"backend/config/config.env"})

// Connecting to Database 
connectDatabase()

const server = app.listen(process.env.PORT, ()=>{
  console.log(`Backend Server [${process.env.NODE_ENV}] is working on [http://localhost:${process.env.PORT}]`)
})

// @Error Handler2
// Unhandled Promise Rejection
process.on("unhandledRejection", err=>{
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`)

  server.close(()=>{
    process.exit(1)
  })
})
// END OF SERVER.JS
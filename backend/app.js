const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middleware/error')

// Middleware configuration
app.use(express.json())
app.use(cookieParser())

//Route Imports 
const vulserverRoute = require('./routes/vulserverRoute')
const vulappRoute = require('./routes/vulappRoute')
const productRoute = require('./routes/productRoute')
const userRoute = require('./routes/userRoute')
const orderRoute = require('./routes/orderRoute')


app.use("/api/v1", vulserverRoute)
app.use("/api/v1", vulappRoute)
app.use("/api/v1", productRoute)
app.use("/api/v1", userRoute)
app.use("/api/v1", orderRoute)


// @Error Handler1
// middleware for error
app.use(errorMiddleware)

module.exports = app;



// END OF APP.JS
const express = require('express');
const morgan = require('morgan');


const app = express();

///1.Middlewares 
app.use(express.json());
app.use(express.static(`${__dirname}/public`));


if (process.env.YENVIRONMENT == "development") {
    app.use(morgan('dev'));
    console.log("morgan called");
}


app.use((req, res, next) => {
    console.log("Hello from the middleware!");
    next();
})
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})



// routes 
const userRouter = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');

app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users/', userRouter);

module.exports = app;




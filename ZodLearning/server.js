const app = require('./app');



const port = process.env.Y_PORT;


app.listen(port, () => {
    console.log(`Server started runnning at ${port}`);
})
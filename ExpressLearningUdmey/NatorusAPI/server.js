// env configuration 
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
// console.log(app.get('env')); this is set by express
// console.log(process.env) //this is set by node default
const port = process.env.PORT || 3000;

const app = require('./app');


app.listen(port, () => {
    console.log(`Server Listening At ${port}`)
})
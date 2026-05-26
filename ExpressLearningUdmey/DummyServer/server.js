const dot_env = require('dotenv');
dot_env.config({ path: "./.env" });

const app = require('./app')
const port = process.env.Y_PORT || 3000;


app.listen(port, () => {
    console.log(` Server Listening at ${port}`);
})
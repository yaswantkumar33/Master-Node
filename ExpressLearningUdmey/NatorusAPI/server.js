// env configuration
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<db_password>',
  encodeURIComponent(process.env.DATABASE_PASS),
);

mongoose.connect(DB).then((con) => {
  // console.log(con.connections);
  console.log('Database connection sucessful');
});

// const testTour = new Tour({
//     name: "The Forest Hiker",
//     rating: 4.6,
//     price: 3456
// })

// testTour.save().then(() => {
//     console.log("Created Sucessfully!");
// });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server Listening At ${port}`);
});

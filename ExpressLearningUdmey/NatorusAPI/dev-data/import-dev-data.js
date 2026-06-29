const fs = require('fs');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const Tour = require('./../models/tourModel');

const DB = process.env.DATABASE.replace(
  '<db_password>',
  encodeURIComponent(process.env.DATABASE_PASS),
);

mongoose.connect(DB).then((con) => {
  console.log('Database connection sucessful');
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/data/tours-simple.json`, 'utf-8'),
);

// Import data to db

const importdata = async () => {
  try {
    await Tour.create(tours);
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany().then(() => {
      console.log('Data Delected Sucessfully');
    });
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] == '--import') {
  importdata();
} else if (process.argv[2] == '--delete') {
  deleteData();
}

console.log(process.argv);

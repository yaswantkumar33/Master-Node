const express = require('express');
const fs = require("fs");

const app = express();

const port = 3000;

app.use(express.json());

// app.get("/", (req, res) => {

//     res.status(200).json({ message: "Hello this form BackEnd", app: "Natorus API" });

// })

// app.post("/", (req, res) => {
//     res.status(200).json({ message: "Hello this form BackEnd POST method", app: "Natorus API" });

// })


const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
app.get("/api/v1/tours", (req, res) => {

    res.status(200).json({
        "status": "Sucess",
        "Results": tours.length,
        "data": {
            tours
        }
    })
})

app.post("/api/v1/tours", (req, res) => {

    // console.log(req.body);
    const NewId = tours[tours.length - 1].id + 1;

    let newTour = Object.assign({ id: NewId }, req.body);

    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: "Success",
            data: {
                tours: newTour
            }
        })
    })
})
app.listen(port, () => {
    console.log(`Server Listening At ${port}`)
})

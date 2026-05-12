const express = require('express');
const fs = require("fs");

const app = express();

const port = 3000;

app.use(express.json());


const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));


const getAllTours = (req, res) => {

    res.status(200).json({
        "status": "Sucess",
        "Results": tours.length,
        "data": {
            tours
        }
    })
}
const createTour = (req, res) => {

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
}
const getTour = (req, res) => {

    let tourId = req.params.id;
    let tour = tours.find((elem) => elem.id === Number(tourId));

    // hadneling the invalid id 
    if (!tour) {
        return res.status(404).json({
            status: "Failed to fetch the Tour",
            message: "Invalid id"
        })
    }

    console.log(req.params);
    res.status(200).json({
        status: "Sucess",
        data: {
            params: tour
        }
    })

}
const updateTours = (req, res) => {
    let tourId = req.params.id;

    let tour = tours.find((elem) => elem.id === Number(tourId));

    // hadneling the invalid id 
    if (!tour) {
        return res.status(404).json({
            status: "Failed to fetch the Tour",
            message: "Invalid id"
        })
    }

    res.status(200).json({
        status: "Success",
        data: {
            message: "Id received form the patch method!"
        }
    })

}
const deleteTour = (req, res) => {
    let tourId = req.params.id;
    let tour = tours.find((elem) => elem.id === Number(tourId));

    // hadneling the invalid id 
    if (!tour) {
        return res.status(404).json({
            status: "Failed to fetch the Tour",
            message: "Invalid id"
        })
    }

    res.status(200).json({
        status: "Success",
        data: {
            message: "Id received form the delete method!"
        }
    })

}
// app.get("/api/v1/tours", getAllTours)
// app.post("/api/v1/tours", createTour)
// to make the paramter optional use "?" at the end 
// app.post("/api/v1/tours/:id/:name/:age?", (req, res) => {
// app.post("/api/v1/tours/:id", getTour)
// app.patch("/api/v1/tours/:id", updateTours)
// app.delete("/api/v1/tours/:id", deleteTour)

// in other way we ca use routes is 
app.route('/api/v1/tours').get(getAllTours).post(createTour)
app.route('/api/v1/tours/:id').post(getTour).patch(updateTours).delete(deleteTour);


app.listen(port, () => {
    console.log(`Server Listening At ${port}`)
})

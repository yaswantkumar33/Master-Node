const fs = require('fs');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));


exports.checkId = (req, res, next, val) => {

    let tour = tours.find((elem) => elem.id === Number(val));

    if (!tour) {
        return res.status(404).json({
            status: "Failed to fetch the Tour",
            message: "Invalid id"
        })
    }

}
exports.getAllTours = (req, res) => {

    res.status(200).json({
        "status": "Sucess",
        "Results": tours.length,
        "data": {
            tours
        }
    })
}
exports.createTour = (req, res) => {

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
exports.getTour = (req, res) => {

    let tourId = req.params.id;
    let tour = tours.find((elem) => elem.id === Number(tourId));

    res.status(200).json({
        status: "Sucess",
        requestTime: req.requestTime,
        data: {
            params: tour
        }
    })

}
exports.updateTours = (req, res) => {
    let tourId = req.params.id;

    let tour = tours.find((elem) => elem.id === Number(tourId));

    res.status(200).json({
        status: "Success",
        data: {
            message: "Id received form the patch method!"
        }
    })

}
exports.deleteTour = (req, res) => {
    let tourId = req.params.id;
    let tour = tours.find((elem) => elem.id === Number(tourId));

    res.status(200).json({
        status: "Success",
        data: {
            message: "Id received form the delete method!"
        }
    })

}
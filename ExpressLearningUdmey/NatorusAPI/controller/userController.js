const fs = require('fs');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.getAllUsers = (req, res) => {
    res.status(500).json({
        status: "Internal serverError",
        message: "This route is no yet implemented"
    })
}
exports.getUser = (req, res) => {
    res.status(500).json({
        status: "Internal serverError",
        message: "This route is no yet implemented"
    })
}
exports.createUser = (req, res) => {
    res.status(500).json({
        status: "Internal serverError",
        message: "This route is no yet implemented"
    })
}
exports.updateUser = (req, res) => {
    res.status(500).json({
        status: "Internal serverError",
        message: "This route is no yet implemented"
    })
}
exports.deleteUser = (req, res) => {
    res.status(500).json({
        status: "Internal serverError",
        message: "This route is no yet implemented"
    })
}
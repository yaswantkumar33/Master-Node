const http = require('http')
const Events = require("events");

// The proper realworld case 
class Sales extends Events {
    constructor() {
        super();
    }
}


const myEmitter = new Sales();
myEmitter.on('NewSale', () => {
    console.log("Event Listiner called for he event NewSale");
})

myEmitter.on('OldSale', () => {
    console.log("Old Sale Event listiner called ");
})

myEmitter.on("NewOrder", (orderCount) => {
    console.log(`${orderCount} this is the number of order counts recevied`);
})
// myEmitter.emit("NewSale")
// using different listiner
// myEmitter.emit("OldSale")
// passing arguments to the event emitter and listiner 
myEmitter.emit("NewOrder", 234);
// this above is called as the observer patten
//-----------------------------//

const server = http.createServer();

server.on("request", (req, res) => {
    console.log("Request Receive");
    res.end("Request Received and response send")
})

server.on("request", (req, res) => {
    console.log("Request Receive 2");
})

server.listen(8000, "127.0.0.1", () => {
    console.log("Waiting for the request............")
})
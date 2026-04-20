const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
    //solution one 
    fs.readFile('./Notes.txt', (err, data) => {
        if (err) console.log(err)
        res.end(data);

    })

    // Solution two 

    const readable = fs.createReadStream('./Notes.txt');

    readable.on("data", (chunk) => {
        res.write(chunk);
    })
    readable.on('end', () => {
        res.end()
    })
    readable.on('error', error => {
        console.log(error);
        res.statusCode(500);
        res.end("File Read Process Failed!")

    })

    // souliton three
    // here this solution is to slove the back presure problem 
    const readable = fs.createReadStream('./Notes.txt');
    readable.pipe(res);
})

server.listen(8000, "127.0.0.1", () => {
    console.log("Server is running......")
})
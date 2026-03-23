// Building a very simple api
let http = require("http");
let url = require("url");
let fs = require("fs");

const product_data = fs.readFileSync("./dev-data/data.json", "utf-8");
const data = JSON.parse(product_data);

const server = http.createServer((req, res) => {
    const pathname = req.url;

    if (pathname == "/" || pathname == "/overview") {
        res.end("hey hi welcome to Home page");
    } else if (pathname == "/products") {
        res.end("hey hi welcome to the products page!!!!");
    } else if (pathname == "/api") {
        res.writeHead(200, { ContentType: "application/json" });
        res.end(data);

    } else {
        res.writeHead(404, {
            ContentType: "text/html",
            "my-custom-header": "hey hello world",
        });
        res.end("<h1>Page Not Found</h1>");
    }
});

server.listen(8000, "127.0.0.1", () => {
    console.log("the srver has been started");
});

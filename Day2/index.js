// Building the simple web server
console.log("Building the simple web server");

// require the http model
let http = require("http");
let url = require("url");

const server = http.createServer((req, res) => {
  const pathname = req.url;
  console.log(pathname);
  if (pathname == "/" || pathname == "/overview") {
    res.end("hey hi welcome to Home page");
  } else if (pathname == "/products") {
    res.end("hey hi welcome to the products page!!!!");
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

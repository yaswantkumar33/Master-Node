// Building the simple web server
console.log("Building the simple web server");
// require the http model
let http = require("http");
http.createServer((req, res) => {
  res.end("Hello this the response from the server");
});

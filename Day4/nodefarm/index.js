let http = require("http");
let fs = require("fs");
let url = require("url");
let replaceTemplate=require('./modules/repalceTemplate')

const product_data = fs.readFileSync("./dev-data/data.json", "utf-8");
const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const data = JSON.parse(product_data);
// console.log(data);



const server = http.createServer((req, res) => {
    const { pathname, query } = (url.parse(req.url, true));
    if (pathname == "/" || pathname == "/overview") {
        res.writeHead(200, { 'Content-type': "text/html" });
        let cards_html = data.map(e => replaceTemplate(templateCard, e)).join('');
        let output = templateOverview.replace(/{%CARDTEMPLATE%}/g, cards_html);
        res.end(output);
    } else if (pathname == "/product/") {
        console.log(query);
        //product
        res.writeHead(200, { 'Content-type': "text/html" });
        let product = data[query.id];
        let output = replaceTemplate(templateProduct, product);
        res.end(output);
    } else {
        res.writeHead(404, {
            'Content-type': "text/html",
            "my-custom-header": "hey hello world",
        });
        res.end("<h1>Page Not Found</h1>");
    }
});

server.listen(8000, "127.0.0.1", () => {
    console.log("the srver has been started");
});

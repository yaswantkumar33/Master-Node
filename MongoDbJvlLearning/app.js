const express = require("express");
const app = express();

const body_parser = require("body-parser");
const express_handlebars = require("express-handlebars");
const dbo = require("./db");

app.use(body_parser.urlencoded({ extended: true }));
app.engine(
    "hbs",
    express_handlebars.engine({
        layoutsDir: "views/",
        defaultLayout: "main",
        extname: "hbs",
    }),
);

app.set("view engine", "hbs");

app.set("views", "views");

app.get("/", async (req, res) => {

    let database = await dbo.getDatabase();
    const collection = database.collection('books');
    const cursor = collection.find({})
    const employees = await cursor.toArray();
    let message = "";

    switch (req.query.status) {
        case "1":
            message = "Inserted successfully";
            break;
        default:
            message = "";
    }
    console.log(req.query.status);

    res.render("main", { message, employees });
});

app.post("/store", async (req, res) => {


    let database = await dbo.getDatabase();
    const collection = database.collection('books');
    let newbook = { title: req.body.title, author: req.body.author }
    await collection.insertOne(newbook);

    return res.redirect("/?status=1");

})
app.listen(8000, () => {
    console.log("Server is Running.......");
});

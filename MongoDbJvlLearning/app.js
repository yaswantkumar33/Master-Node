const express = require("express");
const app = express();

const body_parser = require("body-parser");
const express_handlebars = require("express-handlebars");
const dbo = require("./db");
const ObjectId = dbo.ObjectId;

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
    const books = await cursor.toArray();
    let message = "";

    switch (req.query.status) {
        case "1":
            message = "Inserted successfully";
            break;
        case "2":
            message = "Updated successfully";
            break;
        case "3":
            message = "Deleted Sucessfully";
            break
        default:
            message = "";
    }
    res.render("main", { message, books });

});

app.post("/store", async (req, res) => {


    let database = await dbo.getDatabase();
    const collection = database.collection('books');
    let newbook = { title: req.body.title, author: req.body.author }
    await collection.insertOne(newbook);

    return res.redirect("/?status=1");

})

app.get('/edit/:id', async (req, res) => {

    let database = await dbo.getDatabase();
    const collection = database.collection('books');

    const edit_book = await collection.findOne({ "_id": new ObjectId(req.params.id) });
    let edit_id = req.params.id;

    res.render("main", { edit_book, edit_id });


})

app.post("/update/:id", async (req, res) => {

    let database = await dbo.getDatabase();
    const collection = database.collection('books');

    const obj_id = req.params.id;

    const book_obj = {
        title: req.body.title,
        author: req.body.author,
    };

    await collection.updateOne({ _id: new ObjectId(obj_id) }, { $set: book_obj })

    return res.redirect("/?status=2");

})

app.get("/delete/:id", async (req, res) => {

    let database = await dbo.getDatabase();
    const collection = database.collection('books');

    let obj_id = req.params.id;

    await collection.deleteOne({ _id: new ObjectId(obj_id) })

    return res.redirect("/?status=3");

})
app.listen(8000, () => {
    console.log("Server is Running.......");
});

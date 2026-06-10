const express = require("express");
const app = express();

const body_parser = require("body-parser");
const express_handlebars = require("express-handlebars");
const dbo = require("./db");
// const ObjectId = dbo.ObjectId;
// book model
dbo.getDatabase();

const Book = require('./models/bookModel');

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

    // let database = await dbo.getDatabase();
    // const collection = database.collection('books');
    // const cursor = collection.find({})
    // const books = await cursor.toArray();

    let books = await Book.find().lean();
    // this lean() is not here means it will show issue only in the handlebars templatting engine 

    console.log(books);

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


    // let database = await dbo.getDatabase();
    // const collection = database.collection('books');
    let newbook = { title: req.body.title, author: req.body.author }
    // await collection.insertOne(newbook);
    const book = new Book(newbook);
    book.save();

    return res.redirect("/?status=1");

})

app.get('/edit/:id', async (req, res) => {

    // let database = await dbo.getDatabase();
    // const collection = database.collection('books');

    // const edit_book = await collection.findOne({ "_id": new ObjectId(req.params.id) });
    let edit_id = req.params.id;
    let edit_book = await Book.findOne({ _id: edit_id }).lean();
    console.log(edit_book);


    res.render("main", { edit_book, edit_id });


})

app.post("/update/:id", async (req, res) => {

    // let database = await dbo.getDatabase();
    // const collection = database.collection('books');

    const obj_id = req.params.id;

    await Book.findByIdAndUpdate({ _id: obj_id }, {
        title: req.body.title,
        author: req.body.author,
    })

    return res.redirect("/?status=2");

})

app.get("/delete/:id", async (req, res) => {

    // let database = await dbo.getDatabase();
    // const collection = database.collection('books');

    let obj_id = req.params.id;

    // await collection.deleteOne({ _id: new ObjectId(obj_id) })

    await Book.deleteOne({ _id: obj_id });

    return res.redirect("/?status=3");

})
app.listen(8000, () => {
    console.log("Server is Running.......");
});

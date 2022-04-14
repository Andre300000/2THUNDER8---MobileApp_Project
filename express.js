// this javascript file is the express server that helps to save and load data form server
/* Authors
Aliz Dhital 
Andrew Ali 
Olorunfemi Adeosun 
Lisha Tamang 
*/

//import jquery for ejs files
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = new JSDOM("").window;
global.document = document;
var $ = require("jquery")(window);

//blog array
const blog = ["", "", ""];

const express = require("express"); // start express application
const server = express(); // define top level function
const port = 3056;
const mongoose = require("mongoose"); // require Mongoose
const Blog = require("./blog"); // require blog schema and model

//register view engines
server.set("view engine", "ejs");

// connect to mongo db using mongoose
const dbURI = "mongodb://localhost:27017/a_ali";
mongoose.connect(dbURI).then((result) =>
  server.listen(port, function () {
    console.log("Listening on port 3056");
    // .catch((error) => console.log(error))
  })
);

//db connection
// let db;
// connectToDb((err) => {
//   if(!err) {

//     db = getDb();
//   }
// })

server.use(express.json()); // implement JSON recognition
server.use(express.urlencoded({ extended: true })); // implement incoming name:value pairs to be any type

let allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // allow any origin
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE"); // allow any method
  res.header("Access-Control-Allow-Headers", "Content-Type"); // accept only headers with this type
  next(); // middleware callback function required for processing
};
server.use(allowCrossDomain); // implement allowable domain characteristics

// Upon receiving a get at this url execute callback function
server.get("/loadall", function (req, res) {
  console.log(req.url);
  res.status(200).send(blog);
  res.sendFile(path.join(__dirname, "phase2_final.html"));
});

// Upon receiving a post at this url execute callback function
server.post("/w3review", function (req, res) {
  console.log(req.body.name);
  blog[0] = req.body.name;
  return res.status(200).send(blog);
});

// server.get("/blogs", function (req, res) {
//   Blog.find()
//   .then((result) => {

//   })
// })

// //render blogs page
// server.get("/blogs", function (req, res) {
//   return res.render('blog');
// })

//render create blog page
server.get("/blogs/create", (req, res) => {
  res.render("create");
});

// //handle get request to add blog to db
// server.get("/", function (req, res) {
//   const blog = new Blog({
//     body: "fem-myster"
//   });
//   blog.save()
//    .then((result) => {
//     res.send(result);
//    })
//   //  .catch((error) => {
//   //   console.log(error);
//   //  })
// })

//find blog document
server.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("blog", { blogs: result });
    });
});

//post blog document to database
server.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);

  blog.save().then((result) => {
    res.redirect("/blogs");
  });
});


//delete blog document from database
server.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => {
    res.json({ redirect: "/blogs" });
  });
});

// //find single blog
// server.get("/single", (req, res) => {
//   Blog.findById
// })

// // routes collection
// server.get("/blogs", (req, res) => {
//    let blogs = [];

//    db.collection('blogs')
//    .find()
//    .forEach(blog => blogs.push(blog))
//    .then(() => {
//        res.status(200).json(blogs)
//    })
//    .catch(() => {
//       res.status(500).json({ error: "Couldn't find blog"})
//    })
// })

import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var user;
var userPosts = [
  { id: 1, name: "This is a placeholder post" },
  { id: 2, name: "This is second placeholder post" },
  { id: 3, name: "This is third placeholder post" },
  { id: 4, name: "This is placeholder post4" },
];
var postNumber;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/login", (req, res) => {
  user = req.body.email;
  res.redirect(user);
});

app.get("/:user", (req, res) => {
  var url1 = req.url;
  res.render("home.ejs", {
    posts: userPosts,
    url: url1,
  });
});

app.get("/:user/edit/:id", (req, res) => {
  const user1 = userPosts.filter((item) => item.id == req.params.id);
  // console.log(user1[0].name);
  res.render("update.ejs", {
    post: user1[0].name, // need to pass dynamic post number here instead of 0
    postNumber: user1[0].id,
  });
});

app.post("/shaikhzuber2000@gmail.com/update", (req, res) => {
  userPosts.find((post) => post.id == req.body.postNumber).name = req.body.post;
  res.redirect("/shaikhzuber2000@gmail.com");
  //   res.json({ message: `Updated the post number ${req.body.postNumber}` });
});

app.get("/shaikhzuber2000@gmail.com/delete/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  userPosts = userPosts.filter((itemId) => itemId.id !== postId);
  res.redirect("/shaikhzuber2000@gmail.com");
});

app.get("/shaikhzuber2000@gmail.com/create", (req, res) => {
  res.render("create.ejs");
});

app.post("/shaikhzuber2000@gmail.com/create/new", (req, res) => {
  let items = req.body;
  items.id = userPosts + 1;
  items.postNumber = items.id;
  userPosts.push({ id: items.id, name: items.post });

  res.redirect("/shaikhzuber2000@gmail.com");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

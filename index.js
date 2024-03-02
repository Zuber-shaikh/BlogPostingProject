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
    userName: req.params.user,
  });
});

app.post("/:user/update", (req, res) => {
  userPosts.find((post) => post.id == req.body.postNumber).name = req.body.post;
  res.redirect("/"+ req.params.user);
  //   res.json({ message: `Updated the post number ${req.body.postNumber}` });
});

app.get("/:user/delete/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  userPosts = userPosts.filter((itemId) => itemId.id !== postId);
  // console.log(userPosts);
  res.redirect("/"+ req.params.user);
});

app.get("/:user/create", (req, res) => {
  res.render("create.ejs", {
    userName: req.params.user,
  });
});

app.post("/:user/create", (req, res) => {
  let post = req.body.post;
  // console.log(post);

  postNumber = userPosts.length+1;  

  // console.log(postNumber);
  userPosts.push({id:postNumber, name:post});

  res.redirect("/"+ req.params.user);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

//jshint esversion:6

const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./userSchema.js");

const app = express();
const port = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/usersDB");

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// ROOT ROUTE
app.get("/", (req, res) => {
  try {
    res.render("home");
  } catch (e) {
    console.log(e);
  }
});

// LOGIN ROUTE
app.get("/login", (req, res) => {
  try {
    res.render("login");
  } catch (e) {
    console.log(e);
  }
});

app.post("/login", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    // const checkUser = await User.exists({
    //   email: username,
    //   password: password,
    // });

    // if (checkUser) {
    //   res.render("secrets");
    // } else {
    //   res.send("Email or password is incorrect");
    // }
    const checkUser = await User.findOne({ email: username });
    if (checkUser) {
      if (checkUser.password === password) {
        res.render("secrets");
      } else {
        res.send("Email or password is incorrect");
      }
    } else {
      res.send("Email or password is incorrect");
    }
  } catch (e) {
    console.log(e);
  }
});

//REGISTER ROUTE
app.get("/register", (req, res) => {
  try {
    res.render("register");
  } catch (e) {
    console.log(e);
  }
});

app.post("/register", async (req, res) => {
  try {
    // const checkUser = await User.find({ email: req.body.username });
    // if (checkUser) return;
    // console.log(req.body);
    const checkUser = await User.findOne({ email: req.body.username });
    if (!checkUser) {
      const newUser = await User.create({
        email: req.body.username,
        password: req.body.password,
      });
      res.render("secrets");
    } else {
      res.send("User already exists");
    }
  } catch (e) {
    console.log(e);
  }
});

app.listen(port, () => {
  console.log(`App is listening to port ${port}`);
});

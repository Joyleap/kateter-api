const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const app = express();

// routes
app.get("/hello-world", (req, res) => {
  return res.status(200).send("hello world");
});

// create post

// read get

// update put

// delete

// export api to firebase cloud function
exports.app = functions.https.onRequest(app);

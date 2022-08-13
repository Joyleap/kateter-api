const functions = require("firebase-functions");
const admin = require("firebase-admin");

var serviceAccount = require("./permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const express = require("express");
const app = express();
const db = admin.firestore();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors({ origin: true }));

// routes test
app.get("/hello-world", (req, res) => {
  return res.status(200).send("hello world");
});

// post quiz
app.post("/quiz", async (req, res) => {
  try {
    await db.collection("quiz").add({
      name: req.body.name,
      classroom: req.body.classroom,
      nrp: req.body.nrp,
      time: req.body.time,
      correct: req.body.correct,
      wrong: req.body.wrong,
    });

    return res.status(200).send("data sent");
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// post simulation
app.post("/simulation", async (req, res) => {
  try {
    await db.collection("simulation").add({
      name: req.body.name,
      classroom: req.body.classroom,
      nrp: req.body.nrp,
      time: req.body.time,
    });

    return res.status(200).send("data sent");
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// get all quiz
app.get("/quiz", async (req, res) => {
  try {
    let query = db.collection("quiz");
    let response = [];

    await query.get().then((querySnapshot) => {
      let docs = querySnapshot.docs;
      for (let doc of docs) {
        const selectedItem = {
          id: doc.id,
          name: doc.data().name,
          classroom: doc.data().classroom,
          nrp: doc.data().nrp,
          time: doc.data().time,
          correct: doc.data().correct,
          wrong: doc.data().wrong,
        };
        response.push(selectedItem);
      }
    });

    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// get all simulation
app.get("/simulation", async (req, res) => {
  try {
    let query = db.collection("simulation");
    let response = [];

    await query.get().then((querySnapshot) => {
      let docs = querySnapshot.docs;
      for (let doc of docs) {
        const selectedItem = {
          id: doc.id,
          name: doc.data().name,
          classroom: doc.data().classroom,
          nrp: doc.data().nrp,
          time: doc.data().time,
        };
        response.push(selectedItem);
      }
    });

    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// delete

// export api to firebase cloud function
exports.app = functions.https.onRequest(app);

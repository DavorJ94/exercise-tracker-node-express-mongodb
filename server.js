const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const convertDate = require("./convertDate");
const prepareLogsForShowing = require("./prepareLogsForShowing");
require("dotenv").config();

app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
const dburi = process.env.DB_URI;
const port = process.env.PORT;

//! Connect to mongoose
mongoose
  .connect(dburi, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() =>
    app.listen(port, function () {
      console.log(`Listening on port ${port}`);
    })
  )
  .catch((err) => console.error(err));
//! Connect to mongoose

//! Set up schema
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  username: { type: String, required: true },
  description: String,
  duration: Number,
  date: Date,
  logs: [Object],
});
//! Set up schema

//! Initialize mongoose
const ExerciseUsers = mongoose.model("excerciseTracker", exerciseSchema);
//! Initialize mongoose

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/api/users", (req, res) => {
  ExerciseUsers.find({ username: req.body.username }).then((result) => {
    if (result.length > 0) return res.send("Username already taken");
    else {
      const user = new ExerciseUsers({
        username: req.body.username,
        logs: [],
      });
      user.save().then((result) => {
        res.send({ username: result.username, _id: result._id });
      });
    }
  });
});

app.get("/api/users", (req, res) => {
  ExerciseUsers.find().then(result => {
    let allUsers = []
    result.forEach(item => {
      allUsers.push({
        _id: item.id,
        username: item.username
      })

    })
    res.send(allUsers)
  })
  .catch(err => {
    console.log(err)
  })
})

app.post("/api/users//exercises", (req, res) => {
  return res.send("not found");
});

app.post("/api/users/:_id/exercises", (req, res) => {
  if (req.params._id === "") return res.send("not found");
  if (req.body.description === "")
    return res.send("Path `description` is required.");
  if (req.body.duration === "") return res.send("Path `duration` is required.");
  if (!Number(req.body.duration))
    return res.send(
      `Cast to Number failed for value "${req.body.duration}" at path "duration"`
    );
  ExerciseUsers.find({ _id: req.params._id })
    .then(async (result) => {

      if (result.length === 0) return res.send("Unknown userId");
      const dateInput = convertDate(req.body.date);
        const template = {
          description: req.body.description,
          duration: Number(req.body.duration),
          date: dateInput,
        };

        await ExerciseUsers.findOneAndUpdate(
          { _id: req.params._id },
          { $push: { logs: template } }
        );
        res.send({
          _id: req.params._id,
          username: result[0].username,
          date: dateInput,
          duration: Number(req.body.duration),
          description: req.body.description,
        });
    })
    .catch((err) => {
      res.send(err.message);
    });
});

app.get("/api/users//logs", (req, res) => {
  res.send("not found")
})

app.get("/api/users/:_id/logs", (req, res) => {
  ExerciseUsers.find({ _id: req.params._id }).then( async (result) => {
    if (result.length === 0) return res.send("not found");
    const logs = result.map(log =>  log.logs)
    const username = result.map(user => user.username)
    const processedLogs = await prepareLogsForShowing(req.query.from, req.query.to, req.query.limit, logs);
    if (!req.query.to)
    res.send({
      _id: req.params._id,
      username: username[0],
      count: processedLogs.length,
      log: processedLogs
      })
    else {
    res.send({
      _id: req.params._id,
      username: username[0],
      to: convertDate(req.query.to),
      count: processedLogs.length,
      log: processedLogs
      })
    }
  })
  .catch((err) => {
      res.send(err.message);
    });
});

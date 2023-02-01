const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
const cors = require("cors");
require("dotenv").config();

port = 3001;

app.use(cors());
app.use(express.static("./public"));
app.use(express.json()); //without it we dont have req.body

app.get("/", (req, res) => {
  res.send("My app");
});

app.use("/api/tasks", tasks);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is running on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();

// const mongoose = require("mongoose");
// mongoose.set("strictQuery", true);
// const express = require("express");
// var cors = require("cors");
// const bodyParser = require("body-parser");
// const logger = require("morgan");
// const Data = require("./data");

// const API_PORT = 3035;
// const app = express();
// app.use(cors());
// const router = express.Router();

// // this is our MongoDB database
// const dbRoute =
//   "mongodb+srv://matea-boop:9tXp5YJm@cluster0.leibp8h.mongodb.net/my-app?retryWrites=true&w=majority";

// // connects our back end code with the database
// mongoose.connect(dbRoute, { useNewUrlParser: true });

// let db = mongoose.connection;

// db.once("open", () => console.log("connected to the database"));

// // checks if connection with the database is successful
// db.on("error", console.error.bind(console, "MongoDB connection error:"));

// // (optional) only made for logging and
// // bodyParser, parses the request body to be a readable json format
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(logger("dev"));
// // this is our get method
// // this method fetches all available data in our database
// router.get("/getData", async (req, res) => {
//   Data.find((err, data) => {
//     if (err) return res.json({ success: false, error: err });
//     return res.json({ success: true, data: data });
//   });
// });

// // this is our update method
// // this method overwrites existing data in our database
// router.post("/updateData", (req, res) => {
//   const { id, update } = req.body;
//   Data.findByIdAndUpdate(id, update, (err) => {
//     if (err) return res.json({ success: false, error: err });
//     return res.json({ success: true });
//   });
// });

// // this is our delete method
// // this method removes existing data in our database
// router.delete("/deleteData", (req, res) => {
//   const { id } = req.body;
//   Data.findByIdAndRemove(id, (err) => {
//     if (err) return res.send(err);
//     return res.json({ success: true });
//   });
// });

// // this is our create methid
// // this method adds new data in our database
// router.post("/putData", (req, res) => {
//   const data = new Data();
//   const { id, title, subtasks, status, date } = req.body;
//   data.id = id;
//   data.title = title;
//   data.subtasks = subtasks;
//   data.status = status;
//   data.date = date;

//   data.save((err) => {
//     if (err) return res.json({ success: false, error: err });
//     return res.json({ success: true, data: data });
//   });
// });

// // append /api for our http requests
// app.use("/api", router);

// // launch our backend into a port
// app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

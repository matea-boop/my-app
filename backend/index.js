// const express = require("express");
// const LocalStorage = require("node-localstorage").LocalStorage;
// const localStorage = new LocalStorage("./db");
// const taskList = JSON.stringify(localStorage.getItem("taskList"));
// const bodyParser = require("body-parser");
// const app = express();
// app.use(bodyParser.json());

// console.log(taskList);
// // const mongoose = require("mongoose");

// const cors = require("cors");
// // require("dotenv").config({ path: "./config.env" });
// const port = 3003;
// app.use(cors());
// app.use(express.json());
// // // get driver connection

// //schema

// // var url = "mongodb://localhost:27017/";
// // mongoose.connect(url, function(err, db) {
// //   if (err) throw err;
// //   var dbo = db.db("mydb");
// //   var myobj = JSON.parse(data);
// //   dbo.collection("taskList").insertOne(myobj, function(err, res) {
// //     if (err) throw err;
// //     console.log("1 document inserted");
// //     db.close();
// //   });
// // });
// var router = express.Router();

// const mongoose = require("mongoose");
// mongoose.set("strictQuery", true);

// const dataSchema = new mongoose.Schema({
//   key: String,
//   value: String,
// });

// const Data = mongoose.model("Data", dataSchema);

// app.post("/saveData", (req, res) => {
//   Data.create(req.body, (error, data) => {
//     if (error) {
//       console.log(error);
//       res.status(500).send(error);
//     } else {
//       console.log("Data saved to MongoDB");
//       res.send(data);
//     }
//   });
// });

// app.get("/saveData", function(req, res) {
//   res.json(req.body); // change the path to your index.html
// });

// const database = (module.exports = () => {
//   const connectionParams = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     family: 4,
//   };

//   try {
//     mongoose.connect(
//       "mongodb+srv://matea-boop:9tXp5YJm@cluster0.leibp8h.mongodb.net/my-app?retryWrites=true&w=majority",
//       connectionParams
//     );
//     console.log("connected");
//   } catch (error) {
//     console.log(error);
//     console.log("failed");
//   }
// });

// database();

// // mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true });

// // const MyData = mongoose.model(
// //   "taskList",
// //   new mongoose.Schema({ data: Object })
// // );
// // const newData = new MyData({ data });
// // newData.save((err) => {
// //   if (err) {
// //     console.log(err);
// //   } else {
// //     console.log("Data saved successfully!");
// //   }
// // });

// // var data = {
// //   portal: "GeeksforGeeks",
// //   knowledge: "unlimited",y
// //   location: "Noida",
// // };

// // app.post("http://localhost:3000/", (req, res) => {
// //   const { parcel } = req.body;
// //   console.log(parcel);
// //   if (!parcel) {
// //     return res.status(400).send({ status: "noooot" });
// //   }
// //   res.status(200).send({ status: "donoe" });
// // });

// // app.get("/mj", (req, res) => {
// //   // This will send the JSON data to the client.
// //   res.json(data);
// // });

// // app.post("/saveData", (req, res) => {
// //   let data = { data: req.body.data };

// //   let query = conn.query(sql, data, (err, results) => {
// //     if (err) throw err;
// //     res.send(JSON.stringify({ status: 200, error: null, response: results }));
// //   });
// // });

// app.listen(port, () => {
//   console.log(`Server is running on port: ${port}`);
// });

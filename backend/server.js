const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const events = require("./routes/events");
const notes = require("./routes/notes");
const files = require("./routes/files");
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
app.use("/api/events", events);
app.use("/api/notes", notes);
app.use("/api/files", files);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is running on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();

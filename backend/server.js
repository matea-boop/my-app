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

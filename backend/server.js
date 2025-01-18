require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const budgetsRouter = require("./routes/budgets");
const authRoute = require("./routes/auth");


//CONNECTING TO THE DATABASE
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));


//MIDDLEWARES
app.use(express.json());

//Route middleares
app.use("/budgets", budgetsRouter);
app.use("/auth", authRoute);

app.listen(8000, () => console.log("Server Started"));

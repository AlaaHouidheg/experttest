console.clear();
const express = require("express");
const app = express();
const connectDB = require("./config/dbConnect");

require("dotenv").config();

app.use(express.json());
connectDB();

app.use("/api/user", require("./routes/user"));
app.use("/api/post", require("./routes/post"));
app.use("/api/category", require("./routes/category"));

if (process.env.NODE_ENV === "production") {
  express.use(express.static("/client/build"));
}

app.listen(process.env.PORT, (err) =>
  err ? console.log(err) : console.log("server is running")
);

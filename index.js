const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const docRouter = require("./routes/docRouter");
const categoryRouter = require("./routes/categoryRouter");
require("dotenv/config");

app.use(cors());
app.use(express.json());
app.use("/docs", docRouter)
app.use("/categories", categoryRouter);
app.get("/", (r, rs)=>rs.send("j"))

app.listen(process.env.PORT || 5000, () => {
    console.log("Running app.");
  });

mongoose
  .connect(process.env.MDU)
  .then((s) => console.log("Connected to db"))
  .catch((err) => console.log(err));

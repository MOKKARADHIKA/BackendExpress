const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const router = require("./routes");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// test message (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.send("Backend deployed successfully 🚀");
});

// your main routes
app.use("/api/v1/products", router);

// MongoDB connection (ONLY ONCE)
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// listen (ONLY ONCE)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running");
});

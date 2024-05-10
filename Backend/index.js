const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/route");

const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(
    "mongodb://mitanshubadgujar8:COsSAFFZchGf8H3n@undefined/?replicaSet=atlas-1l5bsc-shard-0&ssl=true&authSource=admin",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Routes
app.use("/api", routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

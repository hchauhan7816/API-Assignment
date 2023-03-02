require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const swaggerJsDoc = require("./final.json");
const swaggerUi = require("swagger-ui-express");

// express app
const app = express();

// middleware
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc));

app.use((req, res, next) => {
  console.log("Request -> ", req.method, req.path);
  next();
});

// Routes
app.use("", userRoutes);

// listening on port 4000
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Listening on port ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("Error -> ", error);
  });

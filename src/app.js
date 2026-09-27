// Import Express to create the application.
const express = require("express");

// Create an Express application instance.
const app = express();

// Parse incoming JSON request bodies.
app.use(express.json());

// Import authentication routes.
const authRouter = require("./routes/auth.routes");

// Mount authentication routes under /api/auth.
app.use("/api/auth", authRouter);

// Export the Express application.
module.exports = app;
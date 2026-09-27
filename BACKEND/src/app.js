// Import Express to create the application.
const express = require("express");
const cookieParser = require("cookie-parser");
// Create an Express application instance.
const app = express();
app.use(cookieParser());
// Parse incoming JSON request bodies.
app.use(express.json());

// Import authentication routes.
const authRouter = require("./routes/auth.routes");

// Mount authentication routes under /api/auth.
app.use("/api/auth", authRouter);

// Export the Express application.
module.exports = app;
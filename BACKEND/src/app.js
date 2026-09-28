// Import Express to create the application.
const express = require("express");
const cookieParser = require("cookie-parser");
// Create an Express application instance.
const app = express();
const cors = require("cors");
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))
app.use(cookieParser());
// Parse incoming JSON request bodies.
app.use(express.json());

// Import authentication routes.
const authRouter = require("./routes/auth.routes");
//Import interview routes
const interviewRouter = require("./routes/interview.routes")

// Mount authentication routes under /api/auth.
app.use("/api/auth", authRouter);
//Mount interview routes under /api/interview
app.use("/api/interview",interviewRouter)

// Export the Express application.
module.exports = app;
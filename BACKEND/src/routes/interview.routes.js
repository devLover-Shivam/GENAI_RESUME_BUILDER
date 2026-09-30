const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const interviewRouter = express.Router();
const interviewController = require("../controllers/interview.controller");
const upload = require("../middlewares/file.middleware");

/**
 * @route POST /api/interview
 * @description Create a new interview report on the basis of resume, self-description and job-description of user
 * @access Private 
 * 
  */

interviewRouter.post("/",authMiddleware.authUser,upload.single("resume"),interviewController.generateInterViewReportController);

module.exports = interviewRouter
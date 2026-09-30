const pdfParse = require("pdf-parse");

const generateInterviewReport = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

async function generateInterViewReportController(req, res) {


    // Extract text from the uploaded PDF
    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText();
   

    // Get user-provided information from request body
    const { selfDescription, jobDescription } = req.body;

    // Generate interview report using AI
    const interviewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    });

    // Save the generated report in MongoDB
    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAi
    });

    // Send the generated report to the client
    res.status(201).json({
        message: "Interview Report generated successfully",
        interviewReport
    });
}

module.exports = {
    generateInterViewReportController
};
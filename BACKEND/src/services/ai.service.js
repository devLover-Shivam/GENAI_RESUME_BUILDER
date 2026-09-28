const { GoogleGenAI } = require ("@google/genai") ;
const { model } = require("mongoose");
const { z } = require("zod");
const {zodToJsonSchema} = require("zod-to-json-schema");

const ai = new GoogleGenAI({apiKey:process.env.GOOGLE_GENAI_API_KEY});

const interviewReportSchema = z.object({

    matchScore: z
        .number()
        .min(0)
        .max(100)
        .describe(
            "Match score from 0 to 100 based on the candidate's profile and job description"
        ),

    technicalQuestions: z.array(
        z.object({
            question: z.string()
                .describe("Technical interview question"),

            intention: z.string()
                .describe("Why the interviewer is asking this question"),

            answer: z.string()
                .describe("What the candidate should discuss when answering")
        })
    ),

    behaviouralQuestions: z.array(
        z.object({
            question: z.string()
                .describe("Behavioral interview question"),

            intention: z.string()
                .describe("Why the interviewer is asking this question"),

            answer: z.string()
                .describe("What the candidate should discuss when answering")
        })
    ),

    skillGaps: z.array(
        z.object({
            skill: z.string()
                .describe("Skill that the candidate needs to improve"),

            severity: z.enum(["low", "medium", "high"])
                .describe("Severity of the skill gap"),

            description: z.string()
                .describe("Why this is considered a skill gap")
        })
    ),

    preparationPlan: z.array(
        z.object({
            day: z.number().int().min(1).max(7),

            focus: z.string()
                .describe("Main preparation focus for the day"),

            tasks: z.array(z.string())
                .describe("Tasks to complete on this day")
        })
    ).length(7)
});
async function generateInterviewReport({resume,selfDescription,jobDescription}){

    const prompt = `
You are an expert technical interviewer and career advisor.

Your task is to analyze the candidate's resume, self-description, and the given
job description and generate a structured interview preparation report.

IMPORTANT:
- Follow the provided response schema exactly.
- Do not add any fields that are not present in the schema.
- Do not remove any required fields.
- Do not generate a generic candidate evaluation.
- Base every conclusion on the information provided.
- Do not assume skills, experience, or projects that are not mentioned.
- The technical questions must be relevant to the candidate's resume AND the job description.
- The behavioral questions must be relevant to the candidate's background and the role.
- Answers should be guidance for the candidate about what to discuss, not fabricated answers.
- Identify genuine skill gaps by comparing the candidate's profile with the job requirements.
- Create a practical preparation plan based specifically on the identified skill gaps.

Generate:
1. A match score from 0-100.
2. Technical interview questions with intention and suggested answer approach.
3. Behavioral interview questions with intention and suggested answer approach.
4. Skill gaps with severity: low, medium, or high.
5. A day-wise preparation plan.

CANDIDATE RESUME:
${resume}

CANDIDATE SELF-DESCRIPTION:
${selfDescription}

JOB DESCRIPTION:
${jobDescription}
`;
    const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents:prompt,
        config:{
            responseMimeType:"application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema, {
    target: "jsonSchema7"
})
        }
    })
    return JSON.parse(response.text);
}


module.exports = generateInterviewReport;
// src/controllers/hrController.js
const pdfParse = require('pdf-parse');
const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.parseCV = catchAsync(async (req, res, next) => {
    const dataBuffer = req.file.buffer; // Upload qua Multer
    const pdfData = await pdfParse(dataBuffer);

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: { responseMimeType: "application/json" } });

    const prompt = `Phân tích CV sau và so sánh với vị trí Dev Node.js. 
    CV: ${pdfData.text}
    Trả về JSON: { "score": 0-100, "skills": [], "summary": "tóm tắt ngắn", "recommendation": "Pass/Fail" }`;

    const result = await model.generateContent(prompt);
    res.status(200).json({ success: true, analysis: JSON.parse(result.response.text()) });
});
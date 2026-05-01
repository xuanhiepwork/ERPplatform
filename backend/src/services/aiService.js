const { GoogleGenerativeAI } = require("@google/generative-ai");

// Khởi tạo Gemini với API Key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.decomposeTask = async (taskTitle, taskDescription) => {
    // Sử dụng model Flash cho tốc độ nhanh và hoàn toàn miễn phí
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: { responseMimeType: "application/json" } // Ép Gemini trả về JSON chuẩn
    });

    const prompt = `
    CHARACTER: Bạn là một Senior Technical Project Manager có kinh nghiệm trong phát triển phần mềm Agile.
    REQUEST: Hãy chia nhỏ nhiệm vụ sau đây thành các Sub-tasks thực thi được.
    TASK: ${taskTitle}
    DESCRIPTION: ${taskDescription}
    AUDIENCE: Developers và Testers.
    TERMINOLOGY: Sử dụng thuật ngữ kỹ thuật chính xác.
    FORMAT: Trả về một mảng JSON các đối tượng gồm: "title", "description", "estimated_hours", "department" (Frontend/Backend/Database/QA).

    CHÚ Ý: Chỉ trả về JSON, không kèm văn bản giải thích.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Chuyển chuỗi văn bản thành Object JSON để Backend xử lý
    return JSON.parse(text);
};
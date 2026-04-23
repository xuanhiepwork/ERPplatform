const { ChromaClient } = require('chromadb');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const client = new ChromaClient();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.askWikiBot = async (userQuery) => {
    // 1. Kết nối Collection (giống như table trong SQL nhưng dành cho Vector)
    const collection = await client.getOrCreateCollection({ name: "company_wiki" });

    // 2. Tạo Embedding cho câu hỏi của nhân viên
    const embeddingModel = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const embedResult = await embeddingModel.embedContent(userQuery);
    const queryVector = embedResult.embedding.values;

    // 3. Truy vấn Vector DB để tìm 3 đoạn văn bản liên quan nhất
    const searchResults = await collection.query({
        queryEmbeddings: [queryVector],
        nResults: 3
    });

    const context = searchResults.documents[0].join("\n\n");

    // 4. Sử dụng khung C.R.E.A.T.E để ra lệnh cho Gemini Flash
    const chatModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `
    CHARACTER: Bạn là Trợ lý Nội bộ HR Helpdesk của công ty.
    REQUEST: Trả lời câu hỏi của nhân viên dựa trên thông tin được cung cấp.
    CONTEXT: ${context}
    QUESTION: ${userQuery}
    AUDIENCE: Nhân viên trong công ty, ngôn ngữ lịch sự, chuyên nghiệp.
    TERMINOLOGY: Sử dụng đúng các thuật ngữ trong chính sách công ty.
    EXTRA: Nếu thông tin không có trong CONTEXT, hãy lịch sự yêu cầu nhân viên liên hệ phòng HR. Tuyệt đối không tự bịa ra chính sách.
    `;

    const result = await chatModel.generateContent(prompt);
    return result.response.text();
};
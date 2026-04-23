//  Bạn chỉ cần chạy script này một lần (hoặc mỗi khi cập nhật Wiki) để đồng bộ hóa dữ liệu.
//  Hiệp tạo một file tên là backend/scripts/seedVectorDB.js. Script này sẽ quét toàn bộ bảng wiki_articles và mã hóa chúng thành các vector để AI có thể "tra cứu ngữ nghĩa".

const { db } = require('../src/config/db');
const { ChromaClient } = require('chromadb');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const client = new ChromaClient();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function ingestWiki() {
    console.log("🚀 Bắt đầu quá trình bơm não cho Chatbot...");

    // 1. Kết nối ChromaDB và Xóa dữ liệu cũ (để tránh bị trùng lặp khi chạy lại)
    const collection = await client.getOrCreateCollection({ name: "company_wiki" });
    const existing = await collection.get();
    if (existing.ids.length > 0) {
        await client.deleteCollection({ name: "company_wiki" });
        await client.getOrCreateCollection({ name: "company_wiki" });
        console.log("🧹 Đã dọn dẹp dữ liệu cũ.");
    }

    // 2. Lấy dữ liệu từ MySQL
    const [articles] = await db.query('SELECT id, title, content FROM wiki_articles');

    if (articles.length === 0) {
        console.log("⚠️ Không có bài viết nào trong MySQL để đồng bộ.");
        process.exit();
    }

    // 3. Duyệt từng bài viết để tạo Embedding và đẩy vào Vector DB
    const embeddingModel = genAI.getGenerativeModel({ model: "text-embedding-004" });

    for (const article of articles) {
        const textToEmbed = `Title: ${article.title}\nContent: ${article.content}`;

        // Tạo Vector từ text
        const result = await embeddingModel.embedContent(textToEmbed);
        const vector = result.embedding.values;

        // Lưu vào ChromaDB
        await collection.add({
            ids: [article.id.toString()],
            embeddings: [vector],
            documents: [textToEmbed],
            metadatas: [{ title: article.title }]
        });

        console.log(`✅ Đã nạp bài viết: ${article.title}`);
    }

    console.log("🎉 Chúc mừng! Con Bot của bạn đã chính thức có não.");
    process.exit();
}

ingestWiki();
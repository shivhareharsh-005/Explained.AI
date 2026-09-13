

import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = gemini.getGenerativeModel({
    model: "gemini-3.6-flash",
})


//  Prompt send to ai 
const generateAIResponse = async (prompt) => {
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    return response;
}

export { 
    model,
    generateAIResponse
};
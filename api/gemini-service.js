// import dotenv from "dotenv"
import 'dotenv/config';
import { GoogleGenerativeAI } from "@google/generative-ai";

// dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const noOfQuestions = 5;

export default async function run(prompt) {
    try {
        const prePrompt = `I have a blog post and I need to generate a quiz based on its content. 
        Ensure the questions cover key points, facts, and concepts presented in the blog. 
        Provide ${noOfQuestions} questions along with their correct answers. 
        return the response in the form of a json object that contains question object and 5 properties nested inside it namely option1,option2,option3,option4,correctAnswer. Each option should consist of 10 words or less
        Please find the below heading for the blog.`;
        const result = await model.generateContent(`${prePrompt} ${prompt}`);
        const response = await result.response;
        const text = response.text();
        console.log(text);
        return text;
    } catch (error) {
        return error;
    }
}

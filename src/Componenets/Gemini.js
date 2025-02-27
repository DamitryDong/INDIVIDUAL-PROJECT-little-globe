"use client";

import { useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const geminiApiKey = process.env.GEMINI_API;

function GeminiTest() {
  useEffect(() => {
    async function fetchGeminiResponse() {
      try {
        const genAI = new GoogleGenerativeAI(geminiApiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = "Explain how AI works";
        const result = await model.generateContent(prompt);

        console.log(await result.response.text()); // This should get me the response
      } catch (error) {
        console.error("Error generating content:", error);
      }
    }

    fetchGeminiResponse();
  }, []);

  return <div>I console logged the gemini response for. The prompt was to explain how ai works.</div>;
}

export default GeminiTest;

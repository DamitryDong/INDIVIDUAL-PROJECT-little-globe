"use client";

import { useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const geminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API;

function GeminiTest() { // CAREFUL THIS IS REALLY SENSITIVE because you have to pay for what you use. 
 
  // LAter we can store the response on a state to display.
    async function fetchGeminiResponse() {
      try {
        const genAI = new GoogleGenerativeAI(geminiApiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = "Explain how AI works"; // THIS IS THE PROMPT
        const result = await model.generateContent(prompt);

        console.log(await result.response.text()); // This should get me the response
      } catch (error) {
        console.error("Error generating content:", error);
      }
    }

  return (  
    <div>
      I console logged the gemini response for how AI works, added to this button
      <button onClick={fetchGeminiResponse} className="border-slate-200 bg-cyan-500">
        Click to log
      </button>
    </div>
  )

}

export default GeminiTest;

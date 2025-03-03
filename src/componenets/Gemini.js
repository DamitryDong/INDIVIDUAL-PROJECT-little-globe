"use client";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { Button } from "flowbite-react";

const geminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API;

function Gemini() { // CAREFUL THIS IS REALLY SENSITIVE because you have to pay for what you use. 
 
  // LAter we can store the response on a state to display.
    async function fetchGeminiResponse() {
      try {
        const genAI = new GoogleGenerativeAI(geminiApiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = "tell me about cats in detail"; // THIS IS THE PROMPT
        const result = await model.generateContent(prompt);

        console.log(await result.response.text()); // This should get me the response
      } catch (error) {
        console.error("Error generating content:", error);
      }
    }

  return (  
    <div>
      <Button size="sm" gradientDuoTone="greenToBlue" onClick={fetchGeminiResponse}>
        AI Find
      </Button>
    </div>
  )

}

export default Gemini;

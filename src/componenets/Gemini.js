"use client";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { Button } from "flowbite-react";
import { useState } from "react";

const geminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API;

function Gemini() { // CAREFUL THIS IS REALLY SENSITIVE because you have to pay for what you use. 

  const [aiQuestion, setAiQuestion] = useState()
 
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
      <form class="max-w-sm mx-auto">
        <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
      </form>
      <Button size="sm" gradientDuoTone="greenToBlue" onClick={fetchGeminiResponse}>
        AI Find
      </Button>
    </div>
  )

}

export default Gemini;

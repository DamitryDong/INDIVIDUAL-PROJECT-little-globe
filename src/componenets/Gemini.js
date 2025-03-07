"use client";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { Button } from "flowbite-react";
import { useState } from "react";

const geminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API;

function Gemini() {
  const [aiQuestion, setAiQuestion] = useState(""); // State for input

  // Function to handle input change
  const handleInputChange = (event) => { //this will handle the aiQuestion to be updated whenever the input is change, does not handtle submit
    setAiQuestion(event.target.value);
  };

  // Fetch AI response
  async function fetchGeminiResponse() { // this handles the submit of the actual promnpt
    if (!aiQuestion.trim()) {
      console.warn("Input is empty.");
      return;
    }

    try {
      const genAI = new GoogleGenerativeAI(geminiApiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent(aiQuestion);

      console.log(await result.response.text()); // response logged currently
    } catch (error) {
      console.error("Error generating content:", error);
    }
  }

  return (
    <form className="max-w-sm mx-auto flex flex-col mb-4">
      <textarea
        id="aiInput"
        rows="4"
        value={aiQuestion} // Bind state to textarea
        onChange={handleInputChange} // Update state on input
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="AI find a location"
      ></textarea>
      <Button size="xs" gradientDuoTone="greenToBlue" onClick={fetchGeminiResponse}>
        AI Find
      </Button>
    </form>
  );
}

export default Gemini;

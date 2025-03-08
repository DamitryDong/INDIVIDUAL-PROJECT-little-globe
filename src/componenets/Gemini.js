"use client";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { Button, Modal, Popover } from "flowbite-react";
import { useState } from "react";
import WobbleEffect from "./GsapAnimation/AiRobot";

const geminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API;

function Gemini() {
  const [aiQuestion, setAiQuestion] = useState(""); // State for input
  const [aiAnswer, setAnswer] = useState("The Answer will return here!"); // State for AI answer

  const [openModal, setOpenModal] = useState(false); 

  // Function to handle input change
  const handleInputChange = (event) => {
    setAiQuestion(event.target.value);
  };

  // Fetch AI response
  async function fetchGeminiResponse() {
    if (!aiQuestion.trim()) {
      console.warn("Input is empty.");
      return;
    }

    try {
      const genAI = new GoogleGenerativeAI(geminiApiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent(`
        this is the prompt: 
        "${aiQuestion}"
        I need you to return the longitude and the latitude of the location if possible, 
        if there is a latitude and longitude, I want you to return "Longitude:(x) Latitude(x)" with the x being the respective latitude and longitude and nothing else please include the ().
        answer "this question doesn't concern location" if the questions is completely not locations related.
        If the question is asking where the user is currently located, return "I have no access to that information". 
        If it's possible to give a rough estimate please do it and state that it's a rough estimate.
        If you need more information please ask.
      `);

      // Set the response from the model as the answer
      const answer = await result.response.text();
      setAnswer(answer);

    } catch (error) {
      console.error("Error generating content:", error);
      setAnswer("An error occurred while fetching the AI response.");
    }
  }

  return (
    <div className="flex flex-row justify-center">

      {/* Popover with button triggering the modal */}
      <Popover content="Let me find it for you!" trigger="hover" placement="top">
        <Button color="Nothning" onClick={() => setOpenModal(true)}>
          <WobbleEffect>
            <img className="w-10 h-10 mt-2" src="/Ai.png" />
          </WobbleEffect>
        </Button>
      </Popover>

      {/* Modal for input and output */}
      <Modal className="modal-backdrop-forAI" show={openModal} size="md" onClose={() => setOpenModal(false)} popup>

        <Modal.Header className="modal-content"/>
        <Modal.Body>
          <form className="max-w-sm mx-auto flex flex-col mb-4 modal-content">

            <textarea
              id="aiInput"
              rows="3"
              value={aiQuestion} // Bind state to textarea
              onChange={handleInputChange} // Update state on input
              className="mb-4 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="ex: Find me the Statue of Liberty"
            ></textarea>

              <div
                id="aiOutput"
                className="flex flex-row justify-start mb-4 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {aiAnswer} {/* Display the AI Answer */}
              </div>

            <Button size="xs" gradientDuoTone="greenToBlue" onClick={fetchGeminiResponse}>
              AI Find
            </Button>

          </form>
        </Modal.Body>

      </Modal>
    </div>
  );
}

export default Gemini;

"use client";
import useLLM from "usellm";
import { useState } from "react";

export default function Home() {
  const llm = useLLM();
  const [question, setQuestion] = useState("");
  const [solution, setSolution] = useState("");
  const [result, setResult] = useState("");

  async function handleClick() {
    try {
      await llm.chat({
        messages: [
          {
            role: "system",
            content: `You are a virtual evaluator coding questions. Given a Question, some code written by a student, and the programming language, your job is to determine whether the code correctly solves the question. If it is correct, simply reply "Correct". if it is incorrect, reply "INCORRECT" and in the next few lines, explain why the code is incorrect using bullet points without giving away the answer. Keep your explanation short.`,
          },
          {
            role: "user",
            content: `Question: ${question} \n\n Solution: ${solution}`,
          },
        ],
        stream: true,
        onStream: ({ message }) => setResult(message.content),
      });
    } catch (error) {
      console.error("Something went wrong!", error);
    }
  }
  return (
    <div className="min-h-screen mx-auto my-8 max-w-4xl">
      <h1 className="text-center mb-4 text-2xl">LeetCode Assistant </h1>
      <div className="flex flex-col p-4">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter Questions here "
          className="rounded border p-2 mr-2 mb-2 text-black"
          rows={3}
        />
        <textarea
          value={solution}
          onChange={(e) => setSolution(e.target.value)}
          placeholder="Enter Solution here"
          className="rounded border p-2 mr-2 mb-2 text-black"
          rows={3}
        />
        <button
          className="rounded border border-black dark:border-white p-2"
          onClick={handleClick}
        >
          Submit
        </button>
      </div>
      <div className="mt-4 whitespace-pre-wrap">{result}</div>
    </div>
  );
}

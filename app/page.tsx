'use client'
import { FormEvent, useState } from 'react';
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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", dangerouslyAllowBrowser: true
});

const Page = () => {
  const [searchInput, setSearchInput] = useState('');
  const [messages, setMessages] = useState<any[]>([]);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!searchInput) return;
    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: searchInput }],
        model: 'gpt-3.5-turbo',
      });

      const message = completion.choices[0].message.content;

      setMessages([...messages, { role: "assistant", content: message }]);
    } catch (error) {
      console.log(error);
    } finally {
      setSearchInput('');
    }
  }

  return (
    <>
      {/* Navbar */}
      <p className="text-2xl text-center bg-gray-100 bg-opacity-60 p-5 text-purple-500">
        Gpt AI Chatbot
      </p>
      {/* Input */}
      <form
        className="max-w-4xl w-full mx-auto items-center justify-center py-3 px-3"
        onSubmit={handleSearch}
      >
        <div className="relative">
          <input
            name="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full px-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            placeholder="Give it a prompt..."
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 px-4 py-2 text-sm font-medium text-white bg-purple-500 border border-transparent rounded-md hover:bg-purple-600 focus:outline-none"
          >
            Search
          </button>
        </div>
      </form>

      {/* Display the response */}
      {messages?.map((e: any, index: number) => (
        <div key={index} className="max-w-4xl w-full mx-auto py-3 px-3">
          <p>{e.content}</p>
        </div>
      ))}
    </>
  );
};

export default Page;

"use client";

import "./globals.css";
import React, { useState, useRef } from "react";

export default function Home() {
  const [noteText, setNoteText] = useState("");
  const textareaRef = useRef(null);

  const handleNoteChange = (event) => {
    setNoteText(event.target.value);
  };

  const handleSaveAsNotes = () => {
    const blob = new Blob([noteText], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "notes.txt";
    link.click();
  };

  const handleOpenNotes = async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".txt";
    fileInput.click();

    fileInput.addEventListener("change", async (event) => {
      const file = event.target.files[0];
      if (file) {
        const text = await file.text();
        setNoteText(text);
      }
    });
  };

  return (
    <main>
      <nav className="">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center">
            <img
              src="https://i.postimg.cc/15RNW37X/logo.png"
              className="h-10 m-8 mr-3"
              alt="Logo"
            />
            <span className="self-center text-3xl font-poppins font-semibold whitespace-nowrap dark:text-white">
              Notepad
            </span>
          </div>
          <div className="flex md:order-2 space-x-3">
            <button
              type="button"
              onClick={() => handleOpenNotes()}
              className="transition ease-in text-white font-poppins bg-black hover:-translate-y-1 duration-150 focus:ring-4 focus:outline-none focus:ring-orange-300 rounded-md text-sm px-3 py-2 text-center mt-4 md:mt-0"
            >
              Open
            </button>
            <button
              type="button"
              onClick={() => handleSaveAsNotes()}
              className="transition ease-in text-white font-poppins bg-black hover:-translate-y-1 duration-150 focus:ring-4 focus:outline-none focus:ring-orange-300 rounded-md text-sm px-3 py-2 text-center mt-4 md:mt-0"
            >
              Save
            </button>
          </div>
        </div>
      </nav>
      <textarea
        ref={textareaRef}
        value={noteText}
        onChange={handleNoteChange}
        className="w-full h-screen bg-transparent text-black focus:border-none border-1 focus:ring-0 ring-0 border-black font-mono p-10 mx-3"
        style={{ fontFamily: "Lucida Console, monospace" }}
        placeholder="Start typing..."
      ></textarea>
    </main>
  );
}

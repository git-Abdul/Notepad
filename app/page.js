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
              className="h-8 m-8 mr-3"
              alt="Logo"
            />
            <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">
              Notepad
            </span>
          </div>
          <div className="flex md:order-2 space-x-3">
            <button
              type="button"
              onClick={() => handleOpenNotes()}
              className="transition ease-in-out delay-150 text-black bg-amber-400 hover:-translate-y-1 hover:scale-110 hover:bg-orange-400 duration-300 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-md px-4 py-2 text-center mt-4 md:mt-0"
            >
              <img
                src="https://www.svgrepo.com/show/532994/plus.svg"
                alt="Open notes"
                className="h-5 w-5 inline-block mr-2"
              />
              Open
            </button>
            <button
              type="button"
              onClick={() => handleSaveAsNotes()}
              className="transition ease-in-out delay-150 text-black bg-amber-400 hover:-translate-y-1 hover:scale-110 hover:bg-orange-400 duration-300 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-md px-4 py-2 text-center mt-4 md:mt-0"
            >
              <img
                src="https://www.svgrepo.com/show/491409/floppy-disk.svg"
                alt="Save notes as..."
                className="h-5 w-5 inline-block mr-2"
              />
              Save as
            </button>
          </div>
        </div>
      </nav>
      <textarea
        ref={textareaRef}
        value={noteText}
        onChange={handleNoteChange}
        className="w-full h-screen bg-black text-white border-none border-black font-mono p-10"
        style={{ fontFamily: "Lucida Console, monospace" }}
        placeholder="Type your notes here..."
      ></textarea>
    </main>
  );
}

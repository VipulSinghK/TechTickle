import React from "react";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center h-screen bg-black">
      <h1 className="text-4xl font-bold text-white mb-6 animate-[pulse_2s_ease-in-out_infinite]">TechTickle</h1>
      <div className="flex space-x-3">
        <div className="h-4 w-4 bg-blue-500 rounded-full animate-[bounce_0.6s_ease-in-out_infinite] transition-colors duration-1000 hover:bg-purple-500"></div>
        <div className="h-4 w-4 bg-blue-500 rounded-full animate-[bounce_0.6s_ease-in-out_0.2s_infinite] transition-colors duration-1000 hover:bg-purple-500"></div>
        <div className="h-4 w-4 bg-blue-500 rounded-full animate-[bounce_0.6s_ease-in-out_0.4s_infinite] transition-colors duration-1000 hover:bg-purple-500"></div>
      </div>
    </div>
  );
}
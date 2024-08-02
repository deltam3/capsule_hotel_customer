"use client";

import React from "react";

interface ErrorProps {
  error: {
    message: string;
  };
  reset: () => void;
}

const Error: React.FC<ErrorProps> = ({ error, reset }) => {
  return (
    <main className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl font-semibold">Warning! Error!</h1>
      <p className="text-lg">{error.message}</p>

      <button
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
        onClick={reset}
      >
        Try again
      </button>
    </main>
  );
};

export default Error;

"use client";

import { useState, ReactNode } from "react";
import Logo from "./Logo";

interface TextExpanderProps {
  children: string;
}

function TextExpander({ children }: TextExpanderProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const displayText = isExpanded
    ? children
    : children.split(" ").slice(0, 40).join(" ") + "...";

  return (
    <span>
      {displayText}{" "}
      <button
        className="text-primary-700 border-b border-primary-700 leading-3 pb-1"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "Show less" : "Show more"}
      </button>
    </span>
  );
}

export default TextExpander;

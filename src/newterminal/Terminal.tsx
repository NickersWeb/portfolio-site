import React, { useEffect, useRef, useState } from "react";
import JQTerminal from "jquery.terminal";

interface TerminalProps {
  interpreter?: TypeOrArray<JQueryTerminal.Interpreter>;
  options?: JQueryTerminal.TerminalOptions;
}

const Terminal = ({ interpreter, options }: TerminalProps) => {
  const node = useRef<HTMLDivElement>(null);
  const [terminal, setTerminal] = useState<JQueryTerminal>();
  useEffect(() => {
    setTerminal($(node).terminal(interpreter, options));
    return () => {
      terminal?.destroy();
    };
  }, []);
  return (
    <div className="tv">
      <div ref={node} id="terminal" />
      <div className="flicker" />
      <div className="scanlines" />
      <div className="noise" />
    </div>
  );
};

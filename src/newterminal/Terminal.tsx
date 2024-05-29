import { useEffect, useRef, useState } from "react";
import $ from "jquery";
import JQTerminal from "jquery.terminal";
import "jquery.terminal/css/jquery.terminal.min.css";
import "./terminal.css";

interface TerminalProps {
  interpreter?: TypeOrArray<JQueryTerminal.Interpreter>;
  options?: JQueryTerminal.TerminalOptions;
}

const Terminal = ({ interpreter, options }: TerminalProps) => {
  const node = useRef<HTMLDivElement>(null);
  const [terminal, setTerminal] = useState<JQueryTerminal>();
  useEffect(() => {
    JQTerminal(window, $);
    setTerminal($(node.current!).terminal(interpreter, options));
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
export default Terminal;

import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import NewTerminal from "./newterminal/App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NewTerminal />
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";

import OldTerminal from "./oldterminal/App.tsx";
import "./index.css";
import NewTerminal from "./newterminal/App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <OldTerminal /> */}
    <NewTerminal />
  </React.StrictMode>
);

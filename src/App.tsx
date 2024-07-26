import "jquery.terminal/css/jquery.terminal.min.css";
import "./App.css";
import "./terminal";

function App() {
  return (
    <div className="tv">
      <div id="terminal"></div>
      <div className="flicker"></div>
      <div className="scanlines"></div>
      <div className="noise"></div>
    </div>
  );
}

export default App;

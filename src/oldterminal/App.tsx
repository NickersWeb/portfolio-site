import "./App.css";
import "jquery.terminal/css/jquery.terminal.min.css";
import "./terminal.js";

function App() {
  return (
    <div id="outer">
      <div id="screen">
        <div id="layer">
          <textarea title="terminal" id="output"></textarea>
        </div>
        <div id="overlay"></div>
      </div>
    </div>
  );
}

export default App;

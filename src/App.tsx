import "./App.css";
import "./terminal.js";

function App() {
  return (
    <div id="outer">
      <div id="screen">
        <div id="layer">
          <textarea id="output"></textarea>
        </div>
        <div id="overlay"></div>
      </div>
      <div id="led"></div>
    </div>
  );
}

export default App;

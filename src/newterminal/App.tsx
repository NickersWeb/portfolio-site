import "jquery.terminal/css/jquery.terminal.min.css";
import "./App.css";
import "./terminal.js";

function App() {
  return (
    <div className="tv">
      <div id="terminal"></div>
      {/* <div class="collection external terminal">
        See Also: <a href="https://codepen.io/jcubic/pen/JjpzzOr" target="top">Red version</a>, or <a href="https://codepen.io/collection/AeGGxz" target="top">Vintage Screen Effects</a>, <a href="https://codepen.io/collection/Mgrkmw"  target="top">Terminal Things</a>, and <a href="https://codepen.io/collection/LPjoaW" target="top">other jQuery Terminal demos</a>.
    </div> */}
      <div className="flicker"></div>
      <div className="scanlines"></div>
      <div className="noise"></div>
    </div>
  );
}

export default App;

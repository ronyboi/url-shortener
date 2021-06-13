import logo from "./logo.svg";
import "./App.css";

import { useEffect, useState } from "react";

function App() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    fetch("/api/time")
      .then((res) => res.json())
      .then((data) => setTime(data.time));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>The current asd is {time}</p>
      </header>
    </div>
  );
}

export default App;

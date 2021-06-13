import "./App.css";
import MainTable from "./components/MainTable.js";
import GoTo from "./components/GoTo";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <MainTable />
          </Route>
          <Route path="/:shortUrl" children={<GoTo />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

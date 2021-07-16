import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import "./App.scss";
import PageHeader from "./components/PageHeader";
import Hero from "./components/Hero";
import Main from "./components/Main";

const App = () => {
  const [searchInput, setSearchInput] = useState("");
  
  const setProp = (prop) => {
    setSearchInput(prop);
  };

  return (
    <Router>
      <div>
        <PageHeader />
        <Hero setProp={setProp} />
        <main>
          <Switch>
            <Route path="/syd/can-my-cat-eat-that/:plantName">
              <h1>Plant Name!</h1>
            </Route>
            <Route exact path="/syd/can-my-cat-eat-that">
              <Main searchInput={searchInput} />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default App;

import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { useState } from "react";
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
          <Route exact path="/">
            <Main searchInput={searchInput} />
          </Route>
        </main>
      </div>
    </Router>
  );
};

export default App;

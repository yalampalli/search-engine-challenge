import React from "react";
import { render } from "react-dom";
import AutoCompleteSearch from "./components/AutoCompleteSearch.js";

const App = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Search Books</h1>
      <AutoCompleteSearch />
    </div>
  );
};

render(<App />, document.getElementById("root"));

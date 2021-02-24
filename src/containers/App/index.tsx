import React from "react";
import SearchBar from "containers/SearchBar";
import Chart from "containers/Chart";
import Tweets from "containers/Tweets";

const App = () => {
  return (
    <div>
      <SearchBar />
      <Chart />
      <Tweets />
    </div>
  );
};

export default App;

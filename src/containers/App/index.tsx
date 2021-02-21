import React from "react";
import styled from "styled-components";
import SearchBar from "containers/SearchBar";
import Chart from "containers/Chart";

/**
 * search bar
 * trendline
 * list of post
 */

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 1rem;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <SearchBar />
    </HeaderContainer>
  );
};

const App = () => {
  return (
    <div>
      <Header />
      <Chart />
    </div>
  );
};

export default App;

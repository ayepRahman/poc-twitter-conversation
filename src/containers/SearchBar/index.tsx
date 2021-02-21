import React from "react";
import { Input } from "antd";
import { useQueryParam, StringParam } from "use-query-params";
import { SC } from "./styled";
const { Search } = Input;

const SearchBar = () => {
  const [, setSearch] = useQueryParam("search", StringParam);

  return (
    <SC.SearchBarContainer>
      <Search
        onSearch={(value: string) => setSearch(value)}
        placeholder="Search Twitter"
      />
    </SC.SearchBarContainer>
  );
};

export default SearchBar;

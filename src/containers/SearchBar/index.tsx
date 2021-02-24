import React from "react";
import { Input, Row, Col } from "antd";
import { useQueryParam, StringParam } from "use-query-params";
import { SC } from "./styled";
const { Search } = Input;

const SearchBar = () => {
  const [search, setSearch] = useQueryParam("search", StringParam);
  const [value, setValue] = React.useState<string>("");

  React.useEffect(() => {
    setValue(search || "");
  }, [search]);

  return (
    <Row justify="center">
      <Col span={8}>
        <SC.SearchBarContainer>
          <Search
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onSearch={(value: string) => setSearch(value)}
            placeholder="Search Twitter"
          />
        </SC.SearchBarContainer>
      </Col>
    </Row>
  );
};

export default SearchBar;

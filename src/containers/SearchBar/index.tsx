import React from "react";
import { Input, Row, Col, Button } from "antd";
import { ClearOutlined } from "@ant-design/icons";
import { useQueryParams, StringParam } from "use-query-params";
import { SC } from "./styled";
const { Search } = Input;

const SearchBar = () => {
  // const [search, setSearch] = useQueryParam("search", StringParam);
  const [query, setQuery] = useQueryParams({
    search: StringParam,
    start: StringParam,
    end: StringParam,
  });
  const [value, setValue] = React.useState<string>("");

  React.useEffect(() => {
    setValue(query.search || "");
  }, [query.search]);

  return (
    <Row justify="center">
      <Col span={8}>
        <SC.SearchBarContainer>
          <Search
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onSearch={(value: string) => setQuery({ search: value })}
            placeholder="Search Twitter"
          />
          <Button
            onClick={() =>
              setQuery({
                search: "",
                start: "",
                end: "",
              })
            }
          >
            <ClearOutlined />
          </Button>
        </SC.SearchBarContainer>
      </Col>
    </Row>
  );
};

export default SearchBar;

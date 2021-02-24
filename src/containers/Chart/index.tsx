import React from "react";
import { useQuery, useApolloClient, useLazyQuery } from "@apollo/client";
import { useQueryParam, useQueryParams, StringParam } from "use-query-params";
import { format, parseISO, addMonths } from "date-fns";
import { Card, Spin } from "antd";
import { data } from "./mocks/data";
import { GET_TREND_RESULT } from "./gql";
import { TimePeriod } from "enums/TimePeriod";
import styled from "styled-components";

import {
  XAxis,
  YAxis,
  Highlight,
  FlexibleWidthXYPlot,
  LineMarkSeries,
} from "react-vis";

const DATE_FORMAT = "dd-MM-yy";

const ChartContainer = styled(Card)`
  margin: 1rem;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  align-items: center;
`;

export const Chart = () => {
  const [query, setQuery] = useQueryParams({
    search: StringParam,
    start: StringParam,
    end: StringParam,
  });
  const { search } = query;
  const [fetchTrendline, { loading, data: fetchData }] = useLazyQuery(
    GET_TREND_RESULT,
    {
      context: { serverName: "PYTHON" },
    }
  );

  React.useEffect(() => {
    if (search) {
      fetchTrendline({
        variables: {
          words: [...search?.split(" ")],
          timeFilter: TimePeriod.P1M,
        },
      });
    }
  }, [search]);

  const mappedData = fetchData?.trendResult?.document?.trendline.map(
    (ele: any) => ({
      x: addMonths(parseISO(ele.date), 1),
      y: ele.count,
    })
  );

  const handleOnDragEnd = (area: any) => {
    if (area) {
      setQuery({
        start: area && area?.left,
        end: area && area?.right,
      });
    }
  };

  return (
    <ChartContainer>
      {loading && !mappedData?.length ? (
        <Container>
          <Spin />
        </Container>
      ) : mappedData?.length ? (
        <FlexibleWidthXYPlot xType="ordinal" margin={{ left: 50 }} height={180}>
          <LineMarkSeries data={mappedData} />
          <XAxis
            style={{
              fontSize: "8px",
            }}
            tickFormat={(value) => {
              return format(new Date(value), DATE_FORMAT);
            }}
          />
          <YAxis />
          <Highlight
            drag
            color="#829AE3"
            enableY={false}
            onDragEnd={handleOnDragEnd}
          />
        </FlexibleWidthXYPlot>
      ) : (
        <Container>No Data</Container>
      )}
    </ChartContainer>
  );
};

export default Chart;

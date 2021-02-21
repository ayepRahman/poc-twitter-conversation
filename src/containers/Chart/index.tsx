import React from "react";
import { useQuery, useApolloClient, useLazyQuery } from "@apollo/client";
import { useQueryParam, useQueryParams, StringParam } from "use-query-params";
import { format, parseISO } from "date-fns";
import { Card } from "antd";
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

const DATE_FORMAT = "MMM yy";

const ChartContainer = styled(Card)`
  display: flex;
  justify-content: center;
  height: calc(180px + 1rem);
  margin: 1rem;
`;

export const Chart = () => {
  const [query, setQuery] = useQueryParams({
    search: StringParam,
    start: StringParam,
    end: StringParam,
  });
  const { search } = query;
  const [fetchTrendline, { loading, error, data: fetchData }] = useLazyQuery(
    GET_TREND_RESULT
  );

  React.useEffect(() => {
    if (search) {
      fetchTrendline({
        variables: {
          words: [...search?.split(" ")],
          timeFilter: TimePeriod.P3M,
        },
      });
    }
  }, [search]);

  const mappedData = fetchData?.trendResult?.document?.trendline.map(
    (ele: any) => ({
      x: ele.date,
      y: ele.count,
    })
  );

  const [selectionState, setSelectionState] = React.useState<{
    selectionStart: string | null;
    selectionEnd: string | null;
  }>({
    selectionStart: null,
    selectionEnd: null,
  });

  const handleOnDragEnd = (area: any) => {
    if (area) {
      setSelectionState({
        selectionStart: area && area?.left,
        selectionEnd: area && area?.right,
      });
      setQuery({
        start: area && area?.left,
        end: area && area?.right,
      });
    }
  };

  return (
    <ChartContainer>
      {mappedData?.length ? (
        <FlexibleWidthXYPlot xType="ordinal" margin={{ left: 50 }} height={180}>
          <LineMarkSeries data={mappedData} />
          <XAxis
            style={{
              fontSize: "8px",
            }}
            tickFormat={(value) => {
              return format(parseISO(value), DATE_FORMAT);
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
        <div>No Data</div>
      )}
    </ChartContainer>
  );
};

export default Chart;

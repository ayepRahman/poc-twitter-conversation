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
  Crosshair,
  CrosshairProps,
} from "react-vis";

const DATE_FORMAT = "dd-MM-yy";

/**
 * - Tooltip functionality
 * - Add Label at the Top of Highlight - indicating the start and end of highlighted trendline area.
 */

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

const TooltipContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.85);
  padding: 0.25rem;
  border-radius: 4px;
  border: solid 1px #ddcec1;
  width: 200px;
`;

const TooltipTitle = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: #333333;
`;

const TooltipContent = styled.div`
  display: flex;
`;

const TooltipLabel = styled.p`
  font-size: 1rem;
`;

export interface ToolptipProps extends CrosshairProps {
  title: string;
  list: { label: string; value: string | number; color?: string }[];
}

const Tooltip: React.FC<ToolptipProps> = ({
  values,
  title,
  list,
  ...props
}) => {
  console.log("values", values);

  return (
    <>
      {values?.length ? (
        <Crosshair values={values} {...props}>
          <TooltipContainer>
            <TooltipTitle>{title}</TooltipTitle>
            {list.map((ele) => {
              return (
                <TooltipContent>
                  <TooltipLabel>{ele.label}:</TooltipLabel>
                  <TooltipLabel>{ele.value}</TooltipLabel>
                </TooltipContent>
              );
            })}
          </TooltipContainer>
        </Crosshair>
      ) : null}
    </>
  );
};

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
  const [tooltipValues, setTooltipValues] = React.useState<
    {
      x: string;
      y: number;
    }[]
  >([]);

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

  const onMouseOnLeave = () => {
    setTooltipValues([]);
  };

  const onNearestX = (value: any, { index }: { index: number }) => {
    console.log("onNearestX", mappedData[index]);

    setTooltipValues([mappedData[index]]);
  };

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
        <FlexibleWidthXYPlot
          onMouseLeave={onMouseOnLeave}
          xType="ordinal"
          margin={{ left: 50 }}
          height={180}
        >
          <LineMarkSeries onNearestX={onNearestX} data={mappedData} />
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
          <Tooltip
            values={tooltipValues}
            title={
              tooltipValues[0]?.x &&
              format(new Date(tooltipValues[0]?.x), "MMMM yyyy")
            }
            list={[{ label: "Volume", value: tooltipValues[0]?.y || "" }]}
          />
        </FlexibleWidthXYPlot>
      ) : (
        <Container>No Data</Container>
      )}
    </ChartContainer>
  );
};

export default Chart;

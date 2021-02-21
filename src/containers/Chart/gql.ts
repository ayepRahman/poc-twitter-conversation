import { gql } from "@apollo/client";

export const GET_TREND_RESULT = gql`
  query GET_TREND_RESULT(
    $words: [String]
    $timeFilter: TimeFilterValues
    $saveHistory: Boolean = true
  ) {
    trendResult(
      words: $words
      timeFilter: $timeFilter
      saveHistory: $saveHistory
    ) {
      document {
        trendline {
          count
          date
        }
      }
    }
  }
`;

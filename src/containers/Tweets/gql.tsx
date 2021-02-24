import { gql } from "@apollo/client";

export const SEARCH_PREMIUM_TWEETS = gql`
  query SEARCH_PREMIUM_TWEETS($query: String!, $toDate: String) {
    premiumSearchTweets(query: $query, toDate: $toDate) {
      id
      createdAt
      userName
      userScreenName
      userImgUrl
      text
      hashtags
      mentions
      imageUrls
      replyCount
      retweetCount
      favouriteCount
    }
  }
`;

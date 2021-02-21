import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { LocalStorage } from "enums/LocalStorage";
import { result } from "lodash";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_SHIFT_PYTHON_BACKEND,
  credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const accessToken = localStorage.getItem("x-token");
  // return the headers to the context so httpLink can read them
  const params = new URLSearchParams(window.location.search);
  const subscriptions = localStorage.getItem(LocalStorage.SUBSCRIPTIONS);
  const parsedSubs = subscriptions && JSON.parse(subscriptions).subscriptions;
  return {
    headers: {
      ...headers,
      "X-Requested-With": "XMLHttpRequest",
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
      [LocalStorage.CATEGORY]:
        params.get(LocalStorage.CATEGORY) ||
        result(parsedSubs, "[0].category", ""),
      [LocalStorage.MARKET]:
        params.get(LocalStorage.MARKET) || result(parsedSubs, "[0].market", ""),
    },
  };
});

const link = ApolloLink.from([authLink, httpLink]);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache({ addTypename: false }),
});

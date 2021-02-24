import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import { RetryLink } from "@apollo/client/link/retry";
import { setContext } from "@apollo/client/link/context";
import { LocalStorage } from "enums/LocalStorage";
import { result } from "lodash";

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

const getHttpLinkOptions = (uri: string) => {
  return {
    uri,
    // credentials: 'include',
  };
};

const links = new RetryLink().split(
  (operation) => operation.getContext().serverName === "PYTHON",
  new HttpLink({
    ...getHttpLinkOptions(process.env.REACT_APP_SHIFT_PYTHON_BACKEND || ""),
  }),
  new HttpLink({
    ...getHttpLinkOptions(process.env.REACT_APP_NESTJS_BACKEND || ""),
  })
);

const link = ApolloLink.from([authLink, links]);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache({ addTypename: false }),
});

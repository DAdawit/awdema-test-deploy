// lib/apollo-client.js
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "https://awdma.afroel.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  let token;

  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;

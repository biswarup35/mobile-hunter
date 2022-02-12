import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: `${process.env.REACT_APP_BLOG_URL}/graphql`,
  cache: new InMemoryCache(),
});

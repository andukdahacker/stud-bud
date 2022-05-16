import type { AppProps } from "next/app";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import "../styles/index.css";
import "../utils/fontAwesome";
import { createUploadLink } from "apollo-upload-client";

function createApolloClient() {
  // const httpLink = new HttpLink({
  //   uri: "http://localhost:4000/graphql",
  //   credentials: "include",
  // });

  const uploadLink = createUploadLink({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
  });

  return new ApolloClient({
    link: uploadLink,
    cache: new InMemoryCache(),
  });
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={createApolloClient()}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;

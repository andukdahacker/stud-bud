import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import "../styles/index.css";
import "../utils/fontAwesome";
import { createApolloClient } from "../lib/apolloClient";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={createApolloClient()}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;

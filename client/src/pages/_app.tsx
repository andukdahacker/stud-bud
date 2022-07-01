import type { AppProps } from "next/app";

import "../styles/index.css";
import "../utils/fontAwesome";

import ReactModal from "react-modal";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";

ReactModal.setAppElement("#__next");

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;

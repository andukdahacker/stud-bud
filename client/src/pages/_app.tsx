import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import "../styles/index.css";
import "../utils/fontAwesome";
import { useApollo } from "../lib/apolloClient";
import ReactModal from "react-modal";

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

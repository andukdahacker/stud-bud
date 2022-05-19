import type { AppProps } from "next/app";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "../styles/index.css";
import "../utils/fontAwesome";
import { createUploadLink } from "apollo-upload-client";
import { GetManyProfilesOutput } from "../generated/graphql";
import merge from "deepmerge";

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
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            getManyProfiles: {
              keyArgs: [],
              merge: (
                existing: GetManyProfilesOutput,
                incoming: GetManyProfilesOutput
              ) => {
                if (existing) {
                  if (!incoming.IOutput.success) {
                    return incoming;
                  }
                  const merged = merge(existing, incoming);
                  return merged;
                }

                return incoming;
              },
            },
          },
        },
      },
    }),
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

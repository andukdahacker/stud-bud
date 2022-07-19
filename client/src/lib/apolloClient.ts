import {
  ApolloCache,
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  split,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import merge from "deepmerge";
import { IncomingHttpHeaders } from "http";
import { useMemo } from "react";
import { isEqual } from "lodash";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import fetch from "isomorphic-unfetch";
import {
  GetConversationOutput,
  GetManyProfilesOutput,
  GetMyBuddiesOutput,
} from "../generated/graphql";
import produce from "immer";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

let apolloClient: ApolloClient<NormalizedCacheObject>;

interface IApolloStateProps {
  [APOLLO_STATE_PROP_NAME]?: NormalizedCacheObject;
}

export const cache: ApolloCache<NormalizedCacheObject> = new InMemoryCache({
  typePolicies: {
    Query: {
      keyFields: [],
      fields: {
        getManyProfiles: {
          keyArgs: [],
          merge: (
            prev: GetManyProfilesOutput,
            incoming: GetManyProfilesOutput
          ) => {
            if (!prev) return incoming;
            if (!incoming) return prev;
            const merged = merge(prev, incoming);
            return merged;
          },
        },
        getConversation: {
          keyArgs: ["where"],
          merge: (
            prev: GetConversationOutput,
            incoming: GetConversationOutput
          ) => {
            if (!prev) return incoming;
            if (prev.Messages && incoming.Messages) {
              if (incoming.Messages.length - prev.Messages.length === 1) {
                return incoming; //send message or subscription data
              }
              const mergedPagiData = produce(incoming, (draft) => {
                if (draft.Messages && prev.Messages) {
                  draft.Messages = [...prev.Messages, ...draft.Messages];
                }
              });

              return mergedPagiData;
            }
            return prev;
          },
        },
        getMyBuddies: {
          keyArgs: [],
          merge: (prev: GetMyBuddiesOutput, incoming: GetMyBuddiesOutput) => {
            if (!prev) return incoming;
            if (!incoming) return prev;

            const merged = produce(prev, (draft) => {
              if (draft.relationships && incoming.relationships) {
                draft.relationships = [
                  ...draft.relationships,
                  ...incoming.relationships,
                ];
              }
            });

            return merged;
          },
        },
      },
    },
  },
});

export const createApolloClient = (
  headers: IncomingHttpHeaders | null = null
) => {
  const enhancedFetch = (url: RequestInfo, init: RequestInit) => {
    return fetch(url, {
      ...init,
      headers: {
        ...init.headers,
        "Access-Control-Allow-Origin": "*",
        // here we pass the cookie along for each request
        Cookie: headers?.cookie ?? "",
      },
    });
  };

  const uploadLink = createUploadLink({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
    fetch: enhancedFetch,
  });

  const wsLink =
    typeof window !== "undefined"
      ? new GraphQLWsLink(
          createClient({
            url: "ws://localhost:4000/graphql",
          })
        )
      : null;

  const link =
    typeof window !== "undefined" && wsLink != null
      ? split(
          ({ query }) => {
            const def = getMainDefinition(query);
            return (
              def.kind === "OperationDefinition" &&
              def.operation === "subscription"
            );
          },
          wsLink,
          uploadLink
        )
      : uploadLink;

  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link,
    cache,
  });
};

export function initializeApollo(
  {
    headers,
    initialState,
  }: {
    headers?: IncomingHttpHeaders | null;
    initialState?: NormalizedCacheObject | null;
  } = { headers: null, initialState: null }
) {
  const _apolloClient = apolloClient ?? createApolloClient(headers);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: { props: IApolloStateProps }
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps: IApolloStateProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(
    () => initializeApollo({ initialState: state }),
    [state]
  );
  return store;
}

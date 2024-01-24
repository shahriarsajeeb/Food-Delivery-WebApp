// app/providers.tsx
"use client";

import { graphqlClient } from "../../graphql/gql.setup";
import { ApolloProvider } from "@apollo/client";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={graphqlClient}>
      <SessionProvider>
        <NextUIProvider>
            {children}
        </NextUIProvider>
      </SessionProvider>
    </ApolloProvider>
  );
}

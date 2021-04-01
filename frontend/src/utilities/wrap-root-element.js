import React from "react";
import { ThemeProvider } from "theme-ui";
import { swiss } from "@theme-ui/presets";
import AmplifyClient from '../amplifyClient/client'
import { IdentityProvider } from '../cognitoIdentity/IdentityProvider';

const newdark = {
  ...swiss,
  sizes: { container: "100%" },
};

export const wrapRootElement = ({ element }) => (
  <AmplifyClient>
    <IdentityProvider>
      <ThemeProvider theme={newdark}>{element}</ThemeProvider>
    </IdentityProvider>
  </AmplifyClient>
);

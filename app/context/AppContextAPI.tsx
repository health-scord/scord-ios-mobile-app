import * as React from "react";
// import { MixpanelConsumer } from "react-mixpanel";
import { AppContextProvider } from ".";

export interface IInitialAppState {
  userData?: any;
  // mixpanel: any;
}

export let InitialAppState: Partial<IInitialAppState> = {
  userData: null
};

export const AppContextAPI = ({ children }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "setUserData":
        return {
          ...state,
          userData: action.userData,
        };

      default:
        return state;
    }
  };

  // load API data via AuthClient or another Client and client.query

  return (
    // <MixpanelConsumer>
    //   {mixpanel => (
        <AppContextProvider
          initialState={{ ...InitialAppState }}
          reducer={reducer}
        >
          {children}
        </AppContextProvider>
    //   )}
    // </MixpanelConsumer>
  );
};

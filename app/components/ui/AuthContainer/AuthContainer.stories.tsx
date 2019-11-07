import * as React from "react";
import { storiesOf } from "@storybook/react";
import AuthContainer from "./AuthContainer";
import TestProvider from "../../modules/client/TestProvider";

const stories = storiesOf("UI Components", module);

stories.add("AuthContainer", () => (
  <TestProvider>
    <AuthContainer />
  </TestProvider>
));

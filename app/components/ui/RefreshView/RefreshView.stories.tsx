import * as React from "react";
import { storiesOf } from "@storybook/react";
import RefreshView from "./RefreshView";
import TestProvider from "../../modules/client/TestProvider";

const stories = storiesOf("UI Components", module);

stories.add("RefreshView", () => (
  <TestProvider>
    <RefreshView />
  </TestProvider>
));

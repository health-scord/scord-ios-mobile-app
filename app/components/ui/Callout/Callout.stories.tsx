import * as React from "react";
import { storiesOf } from "@storybook/react";
import Callout from "./Callout";
import TestProvider from "../../modules/client/TestProvider";

const stories = storiesOf("UI Components", module);

stories.add("Callout", () => (
  <TestProvider>
    <Callout />
  </TestProvider>
));

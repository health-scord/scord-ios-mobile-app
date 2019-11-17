import * as React from "react";
import { storiesOf } from "@storybook/react";
import IntroHeader from "./IntroHeader";
import TestProvider from "../../modules/client/TestProvider";

const stories = storiesOf("UI Components", module);

stories.add("IntroHeader", () => (
  <TestProvider>
    <IntroHeader />
  </TestProvider>
));

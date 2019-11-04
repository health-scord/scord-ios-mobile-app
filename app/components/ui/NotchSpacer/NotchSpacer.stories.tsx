import * as React from "react";
import { storiesOf } from "@storybook/react";
import NotchSpacer from "./NotchSpacer";
import TestProvider from "../../modules/client/TestProvider";

const stories = storiesOf("UI Components", module);

stories.add("NotchSpacer", () => (
  <TestProvider>
    <NotchSpacer />
  </TestProvider>
));

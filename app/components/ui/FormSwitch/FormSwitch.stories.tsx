import * as React from "react";
import { storiesOf } from "@storybook/react";
import FormSwitch from "./FormSwitch";
import TestProvider from "../../modules/client/TestProvider";

const stories = storiesOf("UI Components", module);

stories.add("FormSwitch", () => (
  <TestProvider>
    <FormSwitch />
  </TestProvider>
));

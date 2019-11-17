import * as React from "react";
import { storiesOf } from "@storybook/react";
import FormDatepicker from "./FormDatepicker";
import TestProvider from "../../modules/client/TestProvider";

const stories = storiesOf("UI Components", module);

stories.add("FormDatepicker", () => (
  <TestProvider>
    <FormDatepicker />
  </TestProvider>
));

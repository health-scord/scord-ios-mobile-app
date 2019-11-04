import * as React from "react";
import { storiesOf } from "@storybook/react";
import FormSelect from "./FormSelect";
import TestProvider from "../../modules/client/TestProvider";

const stories = storiesOf("UI Components", module);

stories.add("FormSelect", () => (
  <TestProvider>
    <FormSelect />
  </TestProvider>
));

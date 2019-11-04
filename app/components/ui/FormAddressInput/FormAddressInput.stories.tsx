import * as React from "react";
import { storiesOf } from "@storybook/react";
import FormAddressInput from "./FormAddressInput";
import TestProvider from "../../modules/client/TestProvider";

const stories = storiesOf("UI Components", module);

stories.add("FormAddressInput", () => (
  <TestProvider>
    <FormAddressInput />
  </TestProvider>
));

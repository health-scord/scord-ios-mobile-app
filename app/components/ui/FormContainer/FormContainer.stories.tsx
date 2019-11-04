import * as React from "react";
import { storiesOf } from "@storybook/react";
import FormContainer from "./FormContainer";
import TestProvider from "../../modules/client/TestProvider";

const stories = storiesOf("UI Components", module);

stories.add("FormContainer", () => (
  <TestProvider>
    <FormContainer />
  </TestProvider>
));

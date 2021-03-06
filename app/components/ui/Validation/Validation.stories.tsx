import * as React from "react";
import { storiesOf } from "@storybook/react";
import Validation from "./Validation";
import TestProvider from "../../modules/client/TestProvider";

const stories = storiesOf("UI Components", module);

stories.add("Validation", () => (
  <TestProvider>
    <Validation />
  </TestProvider>
));

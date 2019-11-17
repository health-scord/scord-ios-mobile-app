import * as React from "react";
import { storiesOf } from "@storybook/react";
import MetaInput from "./MetaInput";
import TestProvider from "../../modules/client/TestProvider";

const stories = storiesOf("UI Components", module);

stories.add("MetaInput", () => (
  <TestProvider>
    <MetaInput />
  </TestProvider>
));

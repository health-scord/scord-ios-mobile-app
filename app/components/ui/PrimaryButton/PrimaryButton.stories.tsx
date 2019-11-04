import * as React from "react";
import { storiesOf } from "@storybook/react";
import PrimaryButton from "./PrimaryButton";
import TestProvider from "../../modules/client/TestProvider";

const stories = storiesOf("UI Components", module);

stories.add("PrimaryButton", () => (
  <TestProvider>
    <PrimaryButton />
  </TestProvider>
));

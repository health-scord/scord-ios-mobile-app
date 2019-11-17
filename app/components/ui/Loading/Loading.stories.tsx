import * as React from "react";
import { storiesOf } from "@storybook/react";
import Loading from "./Loading";
import TestProvider from "../../modules/client/TestProvider";

const stories = storiesOf("UI Components", module);

stories.add("Loading", () => (
  <TestProvider>
    <Loading />
  </TestProvider>
));

import * as React from "react";
import { storiesOf } from "@storybook/react";
import SyncFitbit from "./SyncFitbit";
import TestProvider from "../../modules/client/TestProvider";

const stories = storiesOf("UI Components", module);

stories.add("SyncFitbit", () => (
  <TestProvider>
    <SyncFitbit />
  </TestProvider>
));

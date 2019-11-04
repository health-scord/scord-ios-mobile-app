import * as React from "react";
import { storiesOf } from "@storybook/react";
import LoginForm from "./LoginForm";
import TestProvider from "../../modules/client/TestProvider";

const stories = storiesOf("UI Components", module);

stories.add("LoginForm", () => (
  <TestProvider>
    <LoginForm />
  </TestProvider>
));

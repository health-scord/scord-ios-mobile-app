import * as React from "react";
import { render } from "enzyme";

import LoginForm from "./LoginForm";
import TestProvider from "../../modules/client/TestProvider";

describe("LoginForm", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <LoginForm />
      </TestProvider>
    );
  });

  it("", () => {});
});

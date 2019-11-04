import * as React from "react";
import { render } from "enzyme";

import ForgotPasswordForm from "./ForgotPasswordForm";
import TestProvider from "../../modules/client/TestProvider";

describe("ForgotPasswordForm", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <ForgotPasswordForm />
      </TestProvider>
    );
  });

  it("", () => {});
});

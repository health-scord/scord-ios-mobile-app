import * as React from "react";
import { render } from "enzyme";

import AuthContainer from "./AuthContainer";
import TestProvider from "../../modules/client/TestProvider";

describe("AuthContainer", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <AuthContainer />
      </TestProvider>
    );
  });

  it("", () => {});
});

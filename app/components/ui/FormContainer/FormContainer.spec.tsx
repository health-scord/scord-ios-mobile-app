import * as React from "react";
import { render } from "enzyme";

import FormContainer from "./FormContainer";
import TestProvider from "../../modules/client/TestProvider";

describe("FormContainer", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <FormContainer />
      </TestProvider>
    );
  });

  it("", () => {});
});

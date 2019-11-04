import * as React from "react";
import { render } from "enzyme";

import FormSwitch from "./FormSwitch";
import TestProvider from "../../modules/client/TestProvider";

describe("FormSwitch", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <FormSwitch />
      </TestProvider>
    );
  });

  it("", () => {});
});

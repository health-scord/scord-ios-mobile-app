import * as React from "react";
import { render } from "enzyme";

import FormDatepicker from "./FormDatepicker";
import TestProvider from "../../modules/client/TestProvider";

describe("FormDatepicker", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <FormDatepicker />
      </TestProvider>
    );
  });

  it("", () => {});
});

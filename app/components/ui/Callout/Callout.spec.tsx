import * as React from "react";
import { render } from "enzyme";

import Callout from "./Callout";
import TestProvider from "../../modules/client/TestProvider";

describe("Callout", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <Callout />
      </TestProvider>
    );
  });

  it("", () => {});
});

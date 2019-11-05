import * as React from "react";
import { render } from "enzyme";

import IntroHeader from "./IntroHeader";
import TestProvider from "../../modules/client/TestProvider";

describe("IntroHeader", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <IntroHeader />
      </TestProvider>
    );
  });

  it("", () => {});
});

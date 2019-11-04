import * as React from "react";
import { render } from "enzyme";

import NotchSpacer from "./NotchSpacer";
import TestProvider from "../../modules/client/TestProvider";

describe("NotchSpacer", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <NotchSpacer />
      </TestProvider>
    );
  });

  it("", () => {});
});

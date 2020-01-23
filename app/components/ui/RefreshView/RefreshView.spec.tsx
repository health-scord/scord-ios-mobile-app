import * as React from "react";
import { render } from "enzyme";

import RefreshView from "./RefreshView";
import TestProvider from "../../modules/client/TestProvider";

describe("RefreshView", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <RefreshView />
      </TestProvider>
    );
  });

  it("", () => {});
});

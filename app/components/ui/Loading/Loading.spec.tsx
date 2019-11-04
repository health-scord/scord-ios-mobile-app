import * as React from "react";
import { render } from "enzyme";

import Loading from "./Loading";
import TestProvider from "../../modules/client/TestProvider";

describe("Loading", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <Loading />
      </TestProvider>
    );
  });

  it("", () => {});
});

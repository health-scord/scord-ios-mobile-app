import * as React from "react";
import { render } from "enzyme";

import MetaInput from "./MetaInput";
import TestProvider from "../../modules/client/TestProvider";

describe("MetaInput", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <MetaInput />
      </TestProvider>
    );
  });

  it("", () => {});
});

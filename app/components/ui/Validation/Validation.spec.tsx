import * as React from "react";
import { render } from "enzyme";

import Validation from "./Validation";
import TestProvider from "../../modules/client/TestProvider";

describe("Validation", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <Validation />
      </TestProvider>
    );
  });

  it("", () => {});
});

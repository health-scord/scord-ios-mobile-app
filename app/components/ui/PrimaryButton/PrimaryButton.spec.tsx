import * as React from "react";
import { render } from "enzyme";

import PrimaryButton from "./PrimaryButton";
import TestProvider from "../../modules/client/TestProvider";

describe("PrimaryButton", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <PrimaryButton />
      </TestProvider>
    );
  });

  it("", () => {});
});

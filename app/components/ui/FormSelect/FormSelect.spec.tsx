import * as React from "react";
import { render } from "enzyme";

import FormSelect from "./FormSelect";
import TestProvider from "../../modules/client/TestProvider";

describe("FormSelect", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <FormSelect />
      </TestProvider>
    );
  });

  it("", () => {});
});

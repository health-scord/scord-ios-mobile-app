import * as React from "react";
import { render } from "enzyme";

import FormAddressInput from "./FormAddressInput";
import TestProvider from "../../modules/client/TestProvider";

describe("FormAddressInput", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <FormAddressInput />
      </TestProvider>
    );
  });

  it("", () => {});
});

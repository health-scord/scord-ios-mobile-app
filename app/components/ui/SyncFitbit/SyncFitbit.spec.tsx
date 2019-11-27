import * as React from "react";
import { render } from "enzyme";

import SyncFitbit from "./SyncFitbit";
import TestProvider from "../../modules/client/TestProvider";

describe("SyncFitbit", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <SyncFitbit />
      </TestProvider>
    );
  });

  it("", () => {});
});

import * as React from "react";

import { SignUpProps } from "./SignUp.d";
import SignUpForm from "../../ui/SignUpForm/SignUpForm";
import IntroHeader from "../../ui/IntroHeader/IntroHeader";
import FormContainer from "../../ui/FormContainer/FormContainer";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SignUp: React.FC<SignUpProps> = ({ componentId }) => {
  return (
    <KeyboardAwareScrollView>
      <IntroHeader title="Create a player" />
      <FormContainer>
        <SignUpForm componentId={componentId} />
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

export default SignUp;

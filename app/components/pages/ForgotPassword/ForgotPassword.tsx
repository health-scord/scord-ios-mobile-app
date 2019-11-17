import * as React from "react";

import { ForgotPasswordProps } from "./ForgotPassword.d";
import ForgotPasswordForm from "../../ui/ForgotPasswordForm/ForgotPasswordForm";
import IntroHeader from "../../ui/IntroHeader/IntroHeader";
import FormContainer from "../../ui/FormContainer/FormContainer";

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
  return (
    <>
      <IntroHeader title="Forgot Password" />
      <FormContainer>
        <ForgotPasswordForm />
      </FormContainer>
    </>
  );
};

export default ForgotPassword;

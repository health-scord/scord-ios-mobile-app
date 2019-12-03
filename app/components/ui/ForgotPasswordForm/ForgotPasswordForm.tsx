import * as React from "react";

import { ForgotPasswordFormProps } from "./ForgotPasswordForm.d";
import * as Yup from "yup";
import { Formik } from "formik";
import FormInput from "../FormInput/FormInput";
import { withNextInputAutoFocusForm } from "react-native-formik";
import { View, Button, TouchableOpacity, Text, TouchableHighlight } from "react-native";
import { Navigation } from "react-native-navigation";
import styles from "../../../../build/styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AuthClient from "../../../services/AuthClient";
import { ERROR_CODE } from "../../../services/ERROR_CODE";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import Validation from "../Validation/Validation";

const Form = withNextInputAutoFocusForm(View);

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  ref = null,
  className = "",
  onClick = e => console.info("Click"),
}) => {
  const authClient = new AuthClient();
  // const [{ mixpanel }, dispatch] = useAppContext();
  const [cannotFindEmail, setCannotFindEmail] = React.useState(false);
  const [emailSent, setEmailSent] = React.useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .min(4, "Too Short!")
      .max(100, "Too Long!")
      .email("Invalid email")
      .required("Required"),
  });
  
  return (
    <KeyboardAwareScrollView>
      <View>
      {emailSent ? (
        <Validation intent="yay">
          An email has been sent to you to reset your password!
        </Validation>
      ) : (
        <></>
      )}

        <Formik
          initialValues={{}}
          onSubmit={(values, actions) => {
            console.log("values", { values, actions });
            authClient.forgotPassword({ connection: "Username-Password-Authentication", ...values}, (err, res) => {
              if (err) {
                console.error("err", err)
                // console.info("here 1");
                // if (res.body.errorMessage === ERROR_CODE.C001) {
                //   // console.info("hero");
                //   setCannotFindEmail(true);
                // } else {
                //   setCannotFindEmail(false);
                // }
                // if (res.body.errorMessage === ERROR_CODE.C002) {
                // }
              }
              console.info("res", res);
              if (res.text) {
                setEmailSent(true);
              } else {
                setEmailSent(false);
              }
              actions.setSubmitting(false);
              actions.resetForm();
            });
          }}
          validationSchema={validationSchema}
          render={props => {
            return (
              <Form>
                <FormInput label="Email" placeholder="Email" name="email" type="text" />
                <PrimaryButton buttonProps={{ inverted: true, rounded: true }} onPress={props.handleSubmit as any} label="Reset Password" />
              </Form>
            );
          }}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ForgotPasswordForm;

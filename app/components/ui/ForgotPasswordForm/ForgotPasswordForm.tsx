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

const Form = withNextInputAutoFocusForm(View);

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  ref = null,
  className = "",
  onClick = e => console.info("Click"),
}) => {
  const authClient = new AuthClient();
  // const [{ mixpanel }, dispatch] = useAppContext();
  const [userExists, setUserExists] = React.useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(),
  });
  
  return (
    <KeyboardAwareScrollView>
      <View>
        <Formik
          initialValues={{}}
          onSubmit={(values, actions) => {
            console.log("values", values, actions);

            // mixpanel.track("Sign up form submission attempt", {
            //   env: process.env.NODE_ENV,
            //   time: new Date(),
            //   data: {
            //     values,
            //   },
            // });

            authClient.forgotPassword(values, (err, res) => {
              console.info("returned", err, res);

              if (err) {
                console.error(err);
                if (res.body.errorMessage === ERROR_CODE.C008) {
                  setUserExists(true);
                } else {
                  setUserExists(false);
                }
              }
              if (res.body.success) {
                
                // redirect to Home
                console.info(
                  "thank you - go confirm your email and complete your profile"
                );
                
              }
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

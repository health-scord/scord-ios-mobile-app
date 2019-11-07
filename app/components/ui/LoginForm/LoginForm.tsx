import * as React from "react";

import { LoginFormProps } from "./LoginForm.d";

import * as Yup from "yup";
import { Formik } from "formik";
import FormInput from "../FormInput/FormInput";
import { withNextInputAutoFocusForm } from "react-native-formik";
import { View, Button, TouchableOpacity, Text, TouchableHighlight, Keyboard } from "react-native";
import { Navigation } from "react-native-navigation";
import styles from "../../../../build/styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AuthClient from "../../../services/AuthClient";
import { ERROR_CODE } from "../../../services/ERROR_CODE";
import Callout from "../Callout/Callout";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import Validation from "../Validation/Validation";
import StorageClient from "../../../services/StorageClient";

const Form = withNextInputAutoFocusForm(View);

const LoginForm: React.FC<LoginFormProps> = ({
  ref = null,
  className = "",
  onClick = e => console.info("Click"),
  componentId = null
}) => {
  const storageClient = new StorageClient();
  const authClient = new AuthClient();

  const [userDoesNotExist, setUserDoesNotExist] = React.useState(false);
  const [tooManyLoginAttempts, setTooManyLoginAttempts] = React.useState(false);
  const [generalError, setGeneralError] = React.useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required()
      .email("Must be an email"),
    password: Yup.string()
      .required()
      .min(4, "Use a longer password")
  });
  
  return (
    <View>
      <View>

        {tooManyLoginAttempts ? (
          <Validation intent="danger">
            Your account has been blocked after multiple consecutive login attempts.
          </Validation>
        ) : (
          <></>
        )}

        {generalError ? (
          <Validation intent="danger">
            There was an error logging in.
          </Validation>
        ) : (
          <></>
        )}

        {userDoesNotExist ? (
          <Validation intent="danger">
            Please try another email and password combination.
          </Validation>
        ) : (
          <></>
        )}

        <Formik
          initialValues={{
            email: "",
            password: ""
          }}
          onSubmit={(values, actions) => {
            console.log("values", { values, actions });

            Keyboard.dismiss();

            // mixpanel.track("Log in form submission attempt", {
            //   env: process.env.NODE_ENV,
            //   time: new Date(),
            //   data: {
            //     values,
            //   },
            // });

            authClient.login(
              { 
                username: values.email,
                password: values.password 
              }, 
              (err, res) => {
                if (err) {
                  console.error("err", err);
                }
                // if (res['body']['access_token']) {
                //   console.info('success');
                //   // window.location.replace("/");
                // }
                actions.resetForm();
              },
              (err) => {
                console.error("ERROR LOGIN:", err, err.message, err.response);

                actions.setSubmitting(false);

                // TODO: dynamic errors like sign up
                // https://auth0.com/docs/libraries/error-messages
                if (err.response) {
                  setTooManyLoginAttempts(false);
                  setUserDoesNotExist(false);
                  setGeneralError(false);

                  switch (err.response.body.error) {
                    case "too_many_attempts":
                      setTooManyLoginAttempts(true);
                      break;

                    case "invalid_grant":
                      setUserDoesNotExist(true);
                      break;
                
                    default:
                      setGeneralError(true);
                      break;
                  }
                }
              }
            );
          }}
          validationSchema={validationSchema}
          render={props => {
            return (
              <Form>
                <FormInput label="Email" placeholder="Email" name="email" type="email" />
                <FormInput label="Password" placeholder="Password" name="password" type="password" secureTextEntry={true} />
                <TouchableOpacity style={{ ...styles.link, marginTop: 30 }} onPress={() => {
                  Navigation.push(componentId, {
                    component: {
                      name: 'ForgotPassword'
                    }
                  })
                }}>
                  <Text style={styles.linkText}>Forgot your password?</Text>
                </TouchableOpacity>
                <PrimaryButton onPress={props.handleSubmit as any} label="Login" />
                <PrimaryButton onPress={() => authClient.socialLogin("google-oauth2", () => console.info("finished"))} label="Login with Google" />
                <PrimaryButton onPress={() => authClient.socialLogin("facebook", () => console.info("finished"))} label="Login with Facebook" />
                {/* {Platform.OS === "ios" && <KeyboardSpacer />} */}
              </Form>
            );
          }}
        />
      </View>
    </View>
  );
};

export default LoginForm;
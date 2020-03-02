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
import NavigationService from "../../../services/NavigationService";
import Promise from 'bluebird'


const Form = withNextInputAutoFocusForm(View);

const LoginForm: React.FC<LoginFormProps> = ({
  ref = null,
  className = "",
  onClick = e => console.info("Click"),
  componentId = null
}) => {

  const navigationService = new NavigationService();
  const storageClient = new StorageClient();
  const authClient = new AuthClient();

  const [formError, setFormError] = React.useState([null, null]);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required()
      .email("Must be an email"),
    password: Yup.string()
      .required()
      .min(4, "Use a longer password")
  });

  return (
    <>
        {formError[0] !== null ? (
          <Validation intent="danger">
            {formError[1]}
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
            console.log("login values", { values, actions });

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
                  }
              ).then((data) => {
                  actions.resetForm();

                  console.info("login finalized", data);

                  //   Navigation.push(componentId, {
                  //   component: {
                  //     name: 'Scores'
                  //   }
                  // });

                  navigationService.navigateToHome(Navigation, componentId);

              }).catch((err) => {
                  console.warn("ERROR LOGIN:", err, err.message, err.response);

                  actions.setSubmitting(false);

                  if (err.response) {
                      setFormError([err.response.body.error, err.response.body.error_description]);
                  } else {
                      setFormError([null, null]);
                  }
              });
          }}
          validationSchema={validationSchema}
          render={props => {

            return (
              <Form>
                  <View style={{marginBottom: 10}}>
                      {/* <FormInput
                          label="Email"
                          placeholder="Email"
                          name="email"
                          type="email"
                      />
                      <FormInput
                          label="Password"
                          placeholder="Password"
                          name="password"
                          type="password"
                          secureTextEntry={true}
                      />
                      <PrimaryButton
                          buttonProps={{
                              inverted: true,
                              rounded: true
                          }}
                          style={{marginBottom: 20}}
                          onPress={props.handleSubmit as any}
                          label="Login"
                      /> */}
                      {/* <Button
                          title="Forgot your password?"

                          onPress={() => {
                              Navigation.push(componentId, {
                                  component: {
                                      name: 'ForgotPassword'
                                  }
                              })
                          }}
                      /> */}
                  </View>
                  <PrimaryButton
                      buttonProps={{
                          inverted: true,
                          rounded: true
                      }}
                      styles={{marginBottom: 10}}
                      onPress={async () => {
                        await Navigation.showModal({
                          stack: {
                            children: [{
                              component: {
                                name: 'LoadingModal',
                                // passProps: {
                                //   text: 'stack with one child'
                                // },
                                // options: {
                                //   topBar: {
                                //     title: {
                                //       text: 'Modal'
                                //     }
                                //   }
                                // }
                              }
                            }]
                          }
                        });

                        console.log('right here!!!!!!')
                        console.log(componentId)

                        await authClient.socialLogin(
                          "google-oauth2", 
                          componentId
                        );

                        await Promise.delay(3000)

                        //await Navigation.dismissAllModals();

                        navigationService.navigateToHome(Navigation, 1);
                      }}
                      label="Login with Google"
                  />
                  {/* <PrimaryButton
                      buttonProps={{
                          inverted: true,
                          rounded: true
                      }}
                      onPress={() => authClient.socialLogin("facebook", () => console.info("finished"), componentId)}
                      label="Login with Facebook"
                  /> */}
                {/* {Platform.OS === "ios" && <KeyboardSpacer />} */}
              </Form>
            );
          }}
        />
      </>
  );
};

export default LoginForm;

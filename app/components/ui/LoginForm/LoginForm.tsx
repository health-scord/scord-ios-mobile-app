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
  const [notValidType, setNotValidType] = React.useState(false);
  const [emailNotConfirmed, setEmailNotConfirmed] = React.useState(false);

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

        {notValidType ? (
          <Validation intent="danger">
            Your user is not a valid type. Please contact support.
          </Validation>
        ) : (
          <></>
        )}

        {emailNotConfirmed ? (
          <Validation intent="danger">
            Your email has yet to be confirmed. Please check your email!
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
          initialValues={{}}
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

            authClient.login(values, (err, res) => {
              console.info("tad", err, res);
              if (!res.body.success) {
                if (res.body.errorMessage === ERROR_CODE.C003) {
                  setUserDoesNotExist(true);
                } else {
                  setUserDoesNotExist(false);
                }
                if (res.body.errorMessage === ERROR_CODE.C006) {
                  setNotValidType(true);
                } else {
                  setNotValidType(false);
                }
                // if (res.body.errorMessage === ERROR_CODE.C007) {
                //   setEmailNotConfirmed(true);
                // } else {
                //   setEmailNotConfirmed(false);
                // }
              }
              if (res.body.success) {
                // alert("Success");
                storageClient.storeItem('@Reeviewr:token', res.body.data.id);
                Navigation.push(componentId, {
                  component: {
                    name: 'MainMapView',
                    options: {
                      topBar: {
                        visible: false
                      }
                    }
                  }
                });
              }
              actions.resetForm();
            });
          }}
          validationSchema={validationSchema}
          render={props => {
            return (
              <Form>
                <FormInput label="Email" placeholder="Email" name="email" type="email" />
                <FormInput label="Password" placeholder="Password" name="password" type="password" secureTextEntry={true} />
                <PrimaryButton onPress={props.handleSubmit as any} label="Next" />
                {/* <Button onPress={props.handleSubmit as any} title="Next" /> */}
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

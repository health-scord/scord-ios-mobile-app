import * as React from "react";

import { SignUpFormProps } from "./SignUpForm.d";

import * as Yup from "yup";
import { Formik } from "formik";
import FormInput from "../FormInput/FormInput";
import { withNextInputAutoFocusForm } from "react-native-formik";
import { View, Button, KeyboardAvoidingView, TextInput, Keyboard } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { useAppContext } from "../../../context";
import AuthClient from "../../../services/AuthClient";
import { ERROR_CODE } from "../../../services/ERROR_CODE";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import styles from "../../../../build/styles";
import FormDatepicker from "../FormDatepicker/FormDatepicker";
import FormSelect from "../FormSelect/FormSelect";
import { Navigation } from "react-native-navigation";
import { AsyncStorage } from 'react-native';
import StorageClient from "../../../services/StorageClient";
import FormSwitch from "../FormSwitch/FormSwitch";
import Callout from "../Callout/Callout";
import Validation from "../Validation/Validation";
import HomeTabs from "../../pages/Dispatcher/HomeTabs";

const Form = withNextInputAutoFocusForm(View);

const SignUpForm: React.FC<SignUpFormProps> = ({
  ref = null,
  className = "",
  onClick = e => console.info("Click"),
  componentId = null
}) => {
  const storageClient = new StorageClient();
  const authClient = new AuthClient();

  const [{ userData, mixpanel }, dispatch] = useAppContext();
  const [formError, setFormError] = React.useState([null, null]);
  const [successfulSubmission, setSuccessfulSubmission] = React.useState(false);

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is a required field"),
    firstName: Yup.string()
      .required("First Name is a required field"),
    lastName: Yup.string()
      .required("Last Name is a required field"),
    email: Yup.string()
      .email("Must be an email")
      .required("Email is a required field"),
    password: Yup.string()
      .min(4, "Use a longer password")
      .required("Password is a required field"),
    // zipCode: Yup.string()
    //   .required("Zip Code is a required field"),
    // birthday: Yup.string()
    //   .required("Birthday is a required field"),
    // gender: Yup.string()
    //   .required("Gender is a required field")
  });
  
  return (
    <View>
      <View>
        {formError[0] !== null ? (
          <Validation intent="danger">
            {formError[1]}
          </Validation>
        ) : (
          <></>
        )}

        <Formik
          initialValues={{
            // firstName: "",
            // lastName: "",
            // email: "",
            // password: "",
            // zipCode: "",
            // birthday: new Date(),
            // gender: "male"
            username: "",
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            agreeTerms: false
          }}
          onSubmit={(values, actions) => {
            console.log("values", values, actions);

            Keyboard.dismiss();

            console.log(
              "values",
              { values, actions },
              userData
            );

            // mixpanel.track("Sign up form submission attempt", {
            //   env: process.env.NODE_ENV,
            //   time: new Date(),
            //   data: {
            //     values,
            //   },
            // });

            const callback = (err, res) => {
              console.info("returned", err, res);

              setFormError([null, null]);

              if (err) {
                console.error(err);
                if (res.badRequest) {
                  setFormError([res.body.code, res.body.message]);
                }
              }
              if (res.body.id) {
                // redirect to Home
                console.info(
                  "thank you - go confirm your email and complete your profile"
                );
                setSuccessfulSubmission(true);

                Navigation.push(componentId, HomeTabs());
              }
              actions.resetForm();
            }

            const onError = (err) => {
              console.info("onError sign up", err);

              if (typeof err !== "undefined" && typeof err.response !== "undefined") {
                const { code, description, message, policy } = err.response.body;
                
                setFormError([code, typeof message === "string" ? message : description]);
  
                actions.setSubmitting(false);
              }
            }

            // BEWARE: getUserData is expected to fail if no account exists
            // this informs whether to update or create
            authClient.getUserData(null).then((res) => {
              console.info("token res 2", res)
              storageClient.getToken("scordAccessToken").then((token) => {
                storageClient.getToken("scordAuth0Id").then((auth0Id) => {
                  if (typeof res['error'] !== "undefined" && res['error'].error.title === "Account Not Found") {
                    // send to complete profile if not
                    if (auth0Id !== null && typeof auth0Id !== 'undefined') {
                      authClient.createLocalAccount(auth0Id, values, callback, onError);
                    } else {
                      authClient.signup(values, callback, onError);
                    }
                  } else {
                    // send to scores is yes
                    authClient.updateAccount(userData.id, values, callback, onError);
                  }
                });
              });
            })

            // if (initialValues === null) {
            //   authClient.signup(values, callback, onError);
            // } else {
            //   authClient.updateAccount(userData.id, values, callback, onError);
            // }

            // // mixpanel.track("Sign up form submission attempt", {
            // //   env: process.env.NODE_ENV,
            // //   time: new Date(),
            // //   data: {
            // //     values,
            // //   },
            // // });

            // authClient.signup(values, (err, res) => {
            //   console.info("returned", err, res);

            //   if (err) {
            //     console.error(err);
            //     if (res.body.errorMessage === ERROR_CODE.C008) {
            //       setUserExists(true);
            //     } else {
            //       setUserExists(false);
            //     }
            //   }
            //   if (res.body.success) {
                
            //     // redirect to Home
            //     console.info(
            //       "thank you - go confirm your email and complete your profile"
            //     );

            //     // alert("Success");

            //     storageClient.storeItem('@Reeviewr:token', res.body.data.id);

            //     Navigation.push(componentId, {
            //       component: {
            //         name: 'AdvancedProfile'
            //       }
            //     });
            //   }
            //   actions.resetForm();
            // }, (err) => {
            //   console.error("ERROR signup", err);
            //   alert("Sign up error 202");
            // });
          }}
          validationSchema={validationSchema}
          render={props => {
            return (
              <Form>
                <FormInput label="Username" placeholder="Username" name="username" type="text" />
                <FormInput label="Email" placeholder="Email" name="email" type="email" />
                <FormInput label="First Name" placeholder="First Name" name="firstName" type="text" />
                <FormInput label="Last Name" placeholder="Last Name" name="lastName" type="text" />
                <FormInput label="Password" placeholder="Password" name="password" type="password" />
                <FormSwitch label={"Agree to Terms"} value={props.values["agreeTerms"]} setFieldValue={(val) => props.setFieldValue("agreeTerms", val)} />
                {/* <FormInput label="Zip Code" placeholder="Zip Code" name="zipCode" type="text" /> */}
                {/* <FormInput label="Birthday" placeholder="Birthday" name="birthday" type="text" /> */}
                {/* <FormDatepicker name="birthday" placeholder="Birthday" formProps={props} />
                <FormSelect name="gender" placeholder="Gender" formProps={props} style={{ marginBottom: 15 }} items={[{ label: "Male", value: "male" }, { label: "Female", value: "female" }]} /> */}
                <View style={{}}>
                  {/* <PrimaryButton 
                    buttonProps={{ inverted: true, rounded: true }} 
                    onPress={() => { console.info("complete later") }} 
                    label="Complete Later" 
                    styles={{ flex:1, marginBottom: 15 }}
                  /> */}
                  <PrimaryButton 
                    buttonProps={{ inverted: true, rounded: true }}  
                    onPress={props.handleSubmit as any} 
                    label="Sign Up" 
                    styles={{ flex: 1 }} 
                  />
                </View>
              </Form>
            );
          }}
        />
      </View>
    </View>
  );
};

export default SignUpForm;

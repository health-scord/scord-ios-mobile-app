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

    const [{userData, mixpanel}, dispatch] = useAppContext();
    const [formError, setFormError] = React.useState([null, null]);
    const [successfulSubmission, setSuccessfulSubmission] = React.useState(false);

    // React.useEffect(() => {
    //     let timestamp = Date.now();
    //     authClient.signup(
    //         {
    //             email: "alexthegoodman22q3rhh@gmail.com",
    //             username: "alexthegoodmanq273rhh",
    //             firstName: "Alex",
    //             lastName: "Woodman",
    //             password: "las26950!"
    //         },
    //         (val) => console.info("signup success", val),
    //         (err) => console.warn("signup err", err, JSON.stringify(err), timestamp, Date.now())
    //     );
    //     // console.info("GOOOOO!");
    //     // // let timestamp = Date.now();
    //     // fetch('https://jsonplaceholder.typicode.com/todos/1')
    //     //     .then(response => response.json())
    //     //     .then(json => {
    //     //         let timestamp2 = Date.now();
    //     //         console.info("super ultra", json, timestamp, timestamp2);
    //     //     })
    //     //     .catch(err => console.error("death", err))
    // }, []);

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
              console.log("signup values", values, actions);

            actions.setSubmitting(true);

            Keyboard.dismiss();

            // mixpanel.track("Sign up form submission attempt", {
            //   env: process.env.NODE_ENV,
            //   time: new Date(),
            //   data: {
            //     values,
            //   },
            // });

            const callback = (res) => {
                console.info("returned", values, res);

                setFormError([null, null]);

                if (typeof res.id !== "undefined") {
                    console.info("login...");

                    authClient.login(
                        {
                            username: values.email,
                            password: values.password
                        }
                    ).then((data) => {
                        actions.resetForm();
                        Navigation.push(componentId, {
                            component: {
                                name: 'Scores'
                            }
                        });
                    }).catch((err) => {
                        console.error("err", err);
                    });
                }
            };

              const onError = (err) => {
                  console.warn("onError sign up", JSON.stringify(err));

                  // TODO: request timed out box

                  if (typeof err !== "undefined" && typeof err.response !== "undefined") {
                      const {code, description, message, policy} = err.response.body;

                      setFormError([code, typeof message === "string" ? message : description]);

                      actions.setSubmitting(false);
                  }
              };

              // BEWARE: getUserData is expected to fail if no account exists
              // this informs whether to update or create
              if (userData !== null && typeof userData.id !== "undefined") {
                  authClient.updateAccount(userData.id, values, callback, onError);
              } else {
                  storageClient.getToken("scordAccessToken").then((token) => {
                      storageClient.getToken("scordAuth0Id").then((auth0Id) => {
                          if (auth0Id !== null && typeof auth0Id !== 'undefined') {
                              authClient.createLocalAccount(
                                  auth0Id,
                                  values,
                                  callback,
                                  onError,
                                  (data) => console.info("data", data),
                                  (err) => console.info("err", err)
                              );
                          } else {
                              authClient.signup(values, callback, onError).then(data => {
                                  console.info("signup data", data);
                              }).catch(err => {
                                  console.error("err", err);
                              });
                              // const uuid = uuidv1();
                              // authClient.createLocalAccount(
                              //     uuid,
                              //     values,
                              //     callback, // callback and resolves??
                              //     onError,
                              //     (data) => console.info("test1", data),
                              //     (err) => console.info("err1", err)
                              // ).then(data => {
                              //     console.info("signup data", data);
                              // }).catch(err => {
                              //     console.error("err", err);
                              // });
                          }
                      });
                  });
              }
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
                          disabled={props.isSubmitting}
                          buttonProps={{inverted: true, rounded: true}}
                          onPress={props.handleSubmit as any}
                          label="Sign Up"
                          styles={{flex: 1}}
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

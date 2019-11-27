import * as React from "react";

import { SignUpFormProps } from "./SignUpForm.d";

import * as Yup from "yup";
import { Formik } from "formik";
import FormInput from "../FormInput/FormInput";
import { withNextInputAutoFocusForm } from "react-native-formik";
import { View, Button, KeyboardAvoidingView, TextInput } from "react-native";
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

const Form = withNextInputAutoFocusForm(View);

const SignUpForm: React.FC<SignUpFormProps> = ({
  ref = null,
  className = "",
  onClick = e => console.info("Click"),
  componentId = null
}) => {
  const storageClient = new StorageClient();
  const authClient = new AuthClient();
  // const [{ mixpanel }, dispatch] = useAppContext();
  const [userExists, setUserExists] = React.useState(false);

  const validationSchema = Yup.object().shape({
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
    zipCode: Yup.string()
      .required("Zip Code is a required field"),
    birthday: Yup.string()
      .required("Birthday is a required field"),
    gender: Yup.string()
      .required("Gender is a required field")
  });
  
  return (
    <View>
      <View>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            zipCode: "",
            birthday: new Date(),
            gender: "male"
          }}
          onSubmit={(values, actions) => {
            console.log("values", values, actions);

            // mixpanel.track("Sign up form submission attempt", {
            //   env: process.env.NODE_ENV,
            //   time: new Date(),
            //   data: {
            //     values,
            //   },
            // });

            authClient.signup(values, (err, res) => {
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

                // alert("Success");

                storageClient.storeItem('@Reeviewr:token', res.body.data.id);

                Navigation.push(componentId, {
                  component: {
                    name: 'AdvancedProfile'
                  }
                });
              }
              actions.resetForm();
            }, (err) => {
              console.error("ERROR signup", err);
              alert("Sign up error 202");
            });
          }}
          validationSchema={validationSchema}
          render={props => {
            return (
              <Form>
                <FormInput label="First Name" placeholder="First Name" name="firstName" type="text" />
                <FormInput label="Last Name" placeholder="Last Name" name="lastName" type="text" />
                <FormInput label="Email" placeholder="Email" name="email" type="email" />
                <FormInput label="Password" placeholder="Password" name="password" type="password" />
                <FormInput label="Zip Code" placeholder="Zip Code" name="zipCode" type="text" />
                {/* <FormInput label="Birthday" placeholder="Birthday" name="birthday" type="text" /> */}
                <FormDatepicker name="birthday" placeholder="Birthday" formProps={props} />
                <FormSelect name="gender" placeholder="Gender" formProps={props} style={{ marginBottom: 15 }} items={[{ label: "Male", value: "male" }, { label: "Female", value: "female" }]} />
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

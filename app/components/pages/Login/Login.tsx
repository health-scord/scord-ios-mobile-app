import * as React from "react";

import { LoginProps } from "./Login.d";
import LoginForm from "../../ui/LoginForm/LoginForm";
import { View, TouchableOpacity, TouchableHighlight, Text } from "react-native";
import FormContainer from "../../ui/FormContainer/FormContainer";
import { Navigation } from "react-native-navigation";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import styles from "../../../../build/styles";
import PrimaryButton from "../../ui/PrimaryButton/PrimaryButton";

const Login: React.FC<LoginProps> = ({ componentId }) => {
  return (
    <KeyboardAwareScrollView>
      <FormContainer>
        <LoginForm componentId={componentId} />
        <TouchableOpacity style={{ ...styles.link, marginTop: 30 }} onPress={() => {
          Navigation.push(componentId, {
            component: {
              name: 'ForgotPassword'
            }
          })
        }}>
          <Text style={styles.linkText}>Forgot your password?</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 100 }}>
          <Text style={{...styles.noteText, marginBottom: 20 }}>Don't have an account yet?</Text>
          <PrimaryButton onPress={() => {
            Navigation.push(componentId, {
              component: {
                name: 'SignUp'
              }
            })
          }} label="Sign Up For Free" />
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

export default Login;

import * as React from "react";

import { LoginProps } from "./Login.d";
import LoginForm from "../../ui/LoginForm/LoginForm";
import { View, TouchableOpacity, TouchableHighlight, Text } from "react-native";
import FormContainer from "../../ui/FormContainer/FormContainer";
import { Navigation } from "react-native-navigation";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import styles from "../../../../build/styles";
import PrimaryButton from "../../ui/PrimaryButton/PrimaryButton";
import IntroHeader from "../../ui/IntroHeader/IntroHeader";

const Login: React.FC<LoginProps> = ({ componentId }) => {
  return (
    <KeyboardAwareScrollView>
      <FormContainer>
        <IntroHeader />
        <LoginForm componentId={componentId} />
        <View style={{ marginTop: 100 }}>
          <Text style={{...styles.noteText, marginBottom: 20 }}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => {
             Navigation.push(componentId, {
              component: {
                name: 'SignUp'
              }
            })
          }}>
            <Text>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

export default Login;

import * as React from "react";

import { LoginProps } from "./Login.d";
import LoginForm from "../../ui/LoginForm/LoginForm";
import { View, TouchableOpacity, TouchableHighlight, Text, Button } from "react-native";
import FormContainer from "../../ui/FormContainer/FormContainer";
import { Navigation } from "react-native-navigation";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import styles from "../../../../build/styles";
import PrimaryButton from "../../ui/PrimaryButton/PrimaryButton";
import IntroHeader from "../../ui/IntroHeader/IntroHeader";
import AuthContainer from "../../ui/AuthContainer/AuthContainer";

const Login: React.FC<LoginProps> = ({ componentId }) => {
  return (
    <AuthContainer>
      <KeyboardAwareScrollView>
        <FormContainer>
          <IntroHeader />
          <LoginForm componentId={componentId} />
          <View style={{ marginTop: 100 }}>
            <Button title="Sign up for an account" onPress={() => {
              Navigation.push(componentId, {
                component: {
                  name: 'SignUp'
                }
              })
            }} />
          </View>
        </FormContainer>
      </KeyboardAwareScrollView>
    </AuthContainer>
  );
};

export default Login;

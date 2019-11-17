import * as React from "react";

import { AuthContainerProps } from "./AuthContainer.d";
import LinearGradient from "react-native-linear-gradient";
import { View } from "react-native";

import styles from "../../../../build/styles";

const AuthContainer: React.FC<AuthContainerProps> = ({
  ref = null,
  className = "",
  onClick = e => console.info("Click"),
  children = null
}) => {
  const clickHandler = e => onClick(e);
  return (
    // <LinearGradient useAngle={true} angle={135} colors={['rgb(73, 46, 174)', 'rgb(178, 92, 205)']} style={styles.authContainer}>
      <View style={styles.authContainerInner}>
        {children}
      </View>
    // </LinearGradient>
  );
};

export default AuthContainer;

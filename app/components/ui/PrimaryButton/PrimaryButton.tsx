import * as React from "react";

import { PrimaryButtonProps } from "./PrimaryButton.d";
import { TouchableOpacity, Text, Button as RNButton, View } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-ios-kit';

import styles from "../../../../build/styles";

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  ref = null,
  className = "",
  onPress = e => console.info("Click"),
  label = "Submit",
  buttonProps = {},
  styles = {}
}) => {
  const pressHandler = e => onPress(e);

  return (
    <View style={styles}>
      <Button onPress={pressHandler} {...buttonProps}>{label}</Button>
    </View>
  )
  
  // return (
  //   <TouchableOpacity style={{ ...styles.primaryButton, ...style }} onPress={pressHandler}>
  //     <Text style={styles.primaryButtonText}>
  //       {label}
  //     </Text>
  //   </TouchableOpacity>
  // );
};

export default PrimaryButton;

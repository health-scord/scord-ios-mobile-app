import * as React from "react";

import { PrimaryButtonProps } from "./PrimaryButton.d";
import { TouchableOpacity, Text } from "react-native";
import LinearGradient from 'react-native-linear-gradient';

import styles from "../../../../build/styles";

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  ref = null,
  className = "",
  onPress = e => console.info("Click"),
  label = "Submit",
  style = {}
}) => {
  const pressHandler = e => onPress(e);
  
  return (
    <TouchableOpacity style={{ ...styles.primaryButton, ...style }} onPress={pressHandler}>
      {/* <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#FF5532', '#FE0B83']} style={styles.primaryButtonGradient}> */}
        <Text style={styles.primaryButtonText}>
          {label}
        </Text>
      {/* </LinearGradient> */}
    </TouchableOpacity>
  );
};

export default PrimaryButton;

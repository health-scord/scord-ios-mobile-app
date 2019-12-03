import * as React from "react";

import { ValidationProps } from "./Validation.d";
import { View, Text } from "react-native";

import styles from "../../../../build/styles";

const Validation: React.FC<ValidationProps> = ({
  ref = null,
  className = "",
  onClick = e => console.info("Click"),
  children = null,
  intent = "danger"
}) => {
  const clickHandler = e => onClick(e);

  let color = "red";
  if (intent === "yay") color = "green";

  return (
    <View style={{ ...styles.validation }}>
      <Text style={{ ...styles.validationText, ...{ color } }}>{children}</Text>
    </View>
  );
};

export default Validation;

import * as React from "react";

import { IntroHeaderProps } from "./IntroHeader.d";
import { View, Text } from "react-native";

import styles from "../../../../build/styles";

const IntroHeader: React.FC<IntroHeaderProps> = ({
  ref = null,
  className = "",
  onClick = e => console.info("Click"),
  style = {},
}) => {
  const clickHandler = e => onClick(e);
  return (
    <View style={{...styles.introHeader, ...style}}>
      <Text style={styles.logoMark}>scord</Text>
      <Text style={styles.slogan}>Put your fitness data to work for you</Text>
    </View>
  );
};

export default IntroHeader;

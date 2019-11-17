import React from "react";
import { Text, Switch as RNSwitch, View } from "react-native";
import { withFormikControl } from "react-native-formik";

import styles from "../../../../build/styles";

const Switch: React.FC<any> = ({
  ref = null,
  className = "",
  onClick = e => console.info("Click"),
  error, 
  value, 
  setFieldValue, 
  label
}) => {
  const [on, setOn] = React.useState(false);

  let labelStyle = { color: "rgb(155, 155, 155)" };
  if (on) {
    labelStyle = { color: "rgb(254, 11, 132)" };
  }

  return (
    <View style={{ ...styles.inlineRow, ...styles.spaceBetween, marginBottom: 15 }}>
      <Text style={{ ...styles.switchLabel, ...labelStyle, top: 5 }}>{label}</Text>
      <RNSwitch
        value={value}
        // ios_backgroundColor={error ? "red" : "transparent"}
        trackColor={{ false: "#FE0B84", true: "#FE0B84" }}
        onValueChange={(value) => {
          setOn(value);
          setFieldValue(value);
        }}
      />
    </View>
  );
};

export default withFormikControl(Switch);

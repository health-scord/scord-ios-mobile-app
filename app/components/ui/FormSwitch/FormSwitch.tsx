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
  label,
  reverse = false,
  colorOff = "grey",
  colorOn = "rgb(10, 122, 255)"
}) => {
  const [on, setOn] = React.useState(false);

  let labelStyle = { color: colorOff };
  if (on) {
    labelStyle = { color: colorOn };
  }

  const labelComp = <Text style={{ ...styles.switchLabel, ...labelStyle, top: 5 }}>{label}</Text>;

  return (
    <View style={{ ...styles.inlineRow, ...styles.spaceBetween, marginBottom: 15 }}>
      {reverse ? labelComp : <></>}
      <RNSwitch
        value={value}
        // ios_backgroundColor={error ? "red" : "transparent"}
        trackColor={{ false: colorOff, true: colorOn }}
        onValueChange={(value) => {
          setOn(value);
          setFieldValue(value);
        }}
      />
      {!reverse ? labelComp : <></>}
    </View>
  );
};

export default withFormikControl(Switch);

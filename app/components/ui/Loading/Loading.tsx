import * as React from "react";

import { LoadingProps } from "./Loading.d";
import { View, ActivityIndicator, Text } from "react-native";

const Loading: React.FC<LoadingProps> = ({
  ref = null,
  className = "",
  onClick = e => console.info("Click"),
  label = "Loading..."
}) => {
  const clickHandler = e => onClick(e);
  return (
    <View style={{ paddingTop: 100 }}>
      <ActivityIndicator size="large" color="rgb(254, 11, 132)" />
      <Text>{label}</Text>
    </View>
  );
};

export default Loading;

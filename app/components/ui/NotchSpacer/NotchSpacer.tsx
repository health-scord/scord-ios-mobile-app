import * as React from "react";

import { NotchSpacerProps } from "./NotchSpacer.d";
import { View, Dimensions } from "react-native";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const NotchSpacer: React.FC<NotchSpacerProps> = ({
  ref = null,
  className = "",
  onClick = e => console.info("Click"),
  height = 30
}) => {
  const clickHandler = e => onClick(e);
  return (
    <>
      <View style={{ height, width: viewportWidth }}></View>
    </>
  );
};

export default NotchSpacer;

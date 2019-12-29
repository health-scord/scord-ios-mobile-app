import * as React from "react";

import {CalloutProps} from "./Callout.d";
import {View, Text} from "react-native";

import styles from "../../../../build/styles";

const Callout: React.FC<CalloutProps> = ({
                                             ref = null,
                                             className = "",
                                             onClick = e => console.info("Click"),
                                             title = "Attention",
                                             intent = "danger",
                                             children = null
                                         }) => {
    const clickHandler = e => onClick(e);
  return (
      <View style={styles.callout}>
          <Text style={styles.calloutText}>{children}</Text>
      </View>
  );
};

export default Callout;

import * as React from "react";

import { ScoreCounterProps } from "./ScoreCounter.d";
import { useAppContext } from "../../../context";
import { View, Text } from "react-native";

import styles from "../../../../build/styles";

const ScoreCounter: React.FC<ScoreCounterProps> = ({
  ref = null,
  className = "",
  onClick = e => console.info("Click"),
  userData = null
}) => {
  

  const calculated = typeof userData.healthScore !== "undefined" ? userData.healthScore.calculated : undefined;

  return (
    <>
      <View style={styles.scoreCounter}>
      {typeof calculated !== "undefined" ? 
            <Text style={{ ...styles.scoreCounterText, color: "#92cf48", opacity: 1 }}>{calculated}</Text> 
            : <Text style={styles.scoreCounterText}>No data</Text>}
      </View>
    </>
  );
};

export default ScoreCounter;

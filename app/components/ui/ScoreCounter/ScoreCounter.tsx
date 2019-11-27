import * as React from "react";

import { ScoreCounterProps } from "./ScoreCounter.d";
import { useAppContext } from "../../../context";
import { View, Text } from "react-native";

import styles from "../../../../build/styles";
import PrimaryButton from "../PrimaryButton/PrimaryButton";

const ScoreCounter: React.FC<ScoreCounterProps> = ({
  ref = null,
  className = "",
  onClick = e => console.info("Click"),
  userData = null
}) => {

  const calculated = typeof userData.healthScore !== "undefined" ? userData.healthScore.calculated : undefined;

  let bodyContent = (
    <>
      <Text style={styles.scoreLabelEmpty}>--</Text>
    </>
  );

  if (typeof calculated !== "undefined") {
    bodyContent = (
      <>
        <View style={styles.box}>
          <Text style={styles.italicLabel}>Min</Text>
          <Text style={styles.label}>100</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.scoreLabel}>{calculated}</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.label}>300</Text>
          <Text style={styles.italicLabel}>Max</Text>
        </View>
      </>
    );
  }

  return (
    <View style={styles.scoreCounter}>
      <View style={styles.boxHeader}>
        <Text style={styles.boxLabel}>Your Score is:</Text>
      </View>
      <View style={{ ...styles.boxContent, ...styles.inlineRow }}>
        {bodyContent}
      </View>
    </View>
  );
};

export default ScoreCounter;

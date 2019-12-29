import * as React from "react";

import { ScoreCounterProps } from "./ScoreCounter.d";
import {useAppContext} from "../../../context";
import {View, Text, Dimensions} from "react-native";

import styles from "../../../../build/styles";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import StyleHelpers from "../../../services/StyleHelpers";

const ScoreCounter: React.FC<ScoreCounterProps> = ({
                                                       ref = null,
                                                       className = "",
                                                       onClick = e => console.info("Click"),
                                                       userData = null,
                                                       healthScore = null
                                                   }) => {
    const styleHelpers = new StyleHelpers();
    const calculated = typeof healthScore !== "undefined" ? healthScore.calculated : undefined;

  let bodyContent = (
    <>
      <Text style={{ ...styles.scoreLabelEmpty, ...{ width: styleHelpers.getWidth() } }}>--</Text>
    </>
  );

  if (typeof calculated !== "undefined") {
    bodyContent = (
        <View style={{...styles.box, ...styles.bigBox}}>
            <View style={{...styles.box, ...styles.miniBox}}>
                <Text style={styles.italicLabel}>Min</Text>
                <Text style={styles.label}>100</Text>
            </View>
            <View style={{...styles.box, ...styles.miniBox}}>
                <Text style={styles.scoreLabel}>{calculated}</Text>
            </View>
            <View style={{...styles.box, ...styles.miniBox}}>
                <Text style={styles.label}>300</Text>
                <Text style={styles.italicLabel}>Max</Text>
            </View>
        </View>
    );
  }

  return (
      <View style={styles.scoreCounter}>
          <View style={styles.boxHeader}>
              <Text style={styles.boxLabel}>Your Score is:</Text>
          </View>
          <View style={{...styles.boxContent, ...styles.inlineRow}}>
              {bodyContent}
          </View>
          <View style={{...styles.scoreBar, ...{width: styleHelpers.getWidth() * 0.85, alignSelf: "center"}}}>
              <View style={{...styles.scoreBarFill, ...{width: ((calculated / 300) * 100) + "%"}}}></View>
          </View>
      </View>
  );
};

export default ScoreCounter;

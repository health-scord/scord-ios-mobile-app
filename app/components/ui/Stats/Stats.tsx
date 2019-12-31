import * as React from "react";

import { StatsProps } from "./Stats.d";
import { View, Text } from "react-native";

import styles from "../../../../build/styles";
import StyleHelpers from "../../../services/StyleHelpers";
import FormContainer from "../FormContainer/FormContainer";

const Stats: React.FC<StatsProps> = ({
  ref = null,
  className = "",
  onClick = e => console.info("Click"),
   healthScore = null
}) => {
  const styleHelpers = new StyleHelpers();
  const clickHandler = e => onClick(e);

  const stats = [
    {
      label: "Average hours of sleep per night",
        percentage: healthScore !== null ? healthScore["components"]["sleep"]["averageDailySleepHours"] : ""
    },
    {
      label: "Daily active minutes average",
      percentage: healthScore !== null ? healthScore["components"]["fitness"]["averageDailyRigorousActivityMinutes"] : ""
    },
    {
      label: "Average resting heart rate",
      percentage: healthScore !== null ? healthScore["components"]["heartRate"]["averageRestingHeartRate"] : ""
    }
  ];

  return (
    <View style={{ ...styles.stats }}>
      <FormContainer>
        {stats.map((stat, i) => {
          return (
            <View key={i} style={styles.statItem}>
              <Text style={styles.itemLabel}>{stat.label}</Text>
              <Text style={styles.itemPerc}>{stat.percentage ? stat.percentage : "No Data"}</Text>
            </View>
          );
        })}
      </FormContainer>
    </View>
  );
};

export default Stats;
